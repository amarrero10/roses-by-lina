import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

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

  const transport = nodemailer.createTransport({
    service: "gmail",
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: "rosesbylina2025@gmail.com",
    cc: process.env.MY_EMAIL,
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
    from: process.env.MY_EMAIL,
    to: email,
    bcc: "rosesbylina2025@gmail.com",
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
            href="https://www.rosesbylina.com/policies"
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
          We’ll be in touch shortly. If you have any questions in the meantime, feel free to reply
          directly to this email.
        </p>

        <p style="margin-top: 20px;">
          Warm regards,<br />
          <strong>Linette Carcamo</strong>
        </p>
      </body>
    </html>
  `,
  };

  const sendMailPromise = (options: Mail.Options) =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(options, (err) => {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    // Send email to client
    await sendMailPromise(mailToClient);

    // Send email to business
    await sendMailPromise(mailOptions);

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
