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

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
