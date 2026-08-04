import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// Preview phase: send from the developer's Gmail account instead of the shop's, per
// explicit instruction to keep all outgoing mail on the developer's address for now.
// Gmail's SMTP rejects a "from" that doesn't match the authenticated account, so the
// sender identity and the auth credentials must switch together. Falls back to the
// shop's account (MY_EMAIL/MY_PASSWORD) if the preview credentials aren't set.
const senderUser = process.env.PREVIEW_EMAIL_USER || process.env.MY_EMAIL;
const senderPass = process.env.PREVIEW_EMAIL_APP_PASSWORD || process.env.MY_PASSWORD;

export const SENDER_EMAIL = senderUser;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderUser,
    pass: senderPass,
  },
});

export function sendMail(options: Mail.Options) {
  return new Promise<string>((resolve, reject) => {
    transport.sendMail({ ...options, from: options.from ?? SENDER_EMAIL }, (err) => {
      if (!err) {
        resolve("Email sent");
      } else {
        reject(err.message);
      }
    });
  });
}
