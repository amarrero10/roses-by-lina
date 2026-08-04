import { type NextRequest, NextResponse } from "next/server";
import Mail from "nodemailer/lib/mailer";
import { sendMail, SENDER_EMAIL } from "@/utils/mailer";

export async function POST(request: NextRequest) {
  const { email, name, phone, message, date } = await request.json();

  const phoneNumber = [];

  for (let i = 0; i < phone.length; i++) {
    phoneNumber.push(phone[i]);
  }

  const areaCode = phoneNumber.slice(0, 3);

  const firstThree = phoneNumber.slice(3, 6);

  const lastFour = phoneNumber.slice(6, 10);

  const formattedPhoneNumber = `${areaCode.join("")}-${firstThree.join("")}-${lastFour.join("")}`;

  console.log(formattedPhoneNumber);

  const mailOptions: Mail.Options = {
    from: SENDER_EMAIL,
    // Preview phase: business-side notifications go only to the developer, not the shop
    // owner, until she's ready to see live traffic. Switch to MY_EMAIL when ready.
    to: process.env.NOTIFICATION_EMAIL || process.env.MY_EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} `,
    text:
      "Request: " +
      message +
      "\n\n" +
      "Email: " +
      email +
      "\n\n" +
      "Phone: " +
      formattedPhoneNumber +
      "\n\n" +
      "Date Requested: " +
      date,
  };

  const mailToClient: Mail.Options = {
    from: SENDER_EMAIL,
    to: email,
    subject: "Thank You for Contacting Roses by Lina 🌹",
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #4a4a4a; line-height: 1.6;">
        <p>
          Thank you for reaching out to <strong>Roses by Lina</strong>! We’re excited to learn more
          about your floral needs and help bring your vision to life.
        </p>

        <p>
          To help us better assist you, please have an <strong>inspiration photo</strong> or any
          reference images ready, along with any details you may have in mind.
        </p>

        <p>
          Please note that a <strong>50% non-refundable deposit</strong> is required to place and
          secure your order. Orders will not be scheduled without this deposit.
        </p>

        <p>
          We kindly ask that you review our full policies before moving forward:
        </p>

        <p>
          <a
            href="https://www.rosesbylina.boutique/policy"
            style="
              display: inline-block;
              background-color: #6b4eff;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 6px;
              margin-top: 10px;
            "
          >
            View Our Policies
          </a>
        </p>

        <p style="margin-top: 30px;">
          We’ll be in touch shortly. If you have any questions before then, you’re welcome to call or text us.
        </p>

        <p>
          <a href="tel:+18139562388" style="color: #6b4eff; text-decoration: underline;">
            813-956-2388
          </a>
        </p>


        <p style="margin-top: 20px;">
          Warm regards,<br />
          <strong>Linette Carcamo</strong>
        </p>
      </body>
    </html>
  `,
  };

  try {
    // Send email to client
    await sendMail(mailToClient);

    // Send email to business
    await sendMail(mailOptions);

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
