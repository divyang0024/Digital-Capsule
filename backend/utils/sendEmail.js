import nodemailer from "nodemailer";
import { ErrorHandler } from "./errorhandler.js";

const sendInvitationEmail = async (friendsEmails, capsuleId,sender,capsuleDetails) => {
  // Create a transporter for sending email using a service like Gmail or any other SMTP service
  const transporter = nodemailer.createTransport({
    service: "gmail", // Change to your email service provider if needed
    auth: {
      user: process.env.SMTP_MAIL, // Your email address
      pass: process.env.SMTP_PASSWORD, // Your email password or App password
    },
  });

  // Loop through the friends emails to send invitations one by one
  for (let email of friendsEmails) {
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "🎉 You've Received a Capsule Invitation on Yaadgaar! 🌟",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #4CAF50;">🎉 You've Received a Capsule Invitation on Yaadgaar! 🌟</h2>
          <p>Dear <strong>${email.split('@')[0]}</strong>,</p>

          <p>You have been invited to view a special Capsule on <strong>Yaadgaar</strong> by <strong>${sender.name}</strong>!</p>

          <ul>
            <li><strong>✨ Capsule Title:</strong> ${capsuleDetails.title}</li>
            <li><strong>📜 Capsule Description:</strong> ${capsuleDetails.description}</li>
            <li><strong>📅 Release Date:</strong> ${new Date(capsuleDetails.releaseAt).toLocaleDateString()}</li>
          </ul>

          <p>
            This Capsule contains a surprise message, memory, or moment that <strong>${sender.name}</strong> wanted to share with you.
            Once the release date arrives, you'll be able to open and experience the surprise they've prepared for you.
          </p>

          <p style="text-align: center;">
            <a 
              href="https://digital-capsule.vercel.app/capsule/invite/${email}?capsuleId=${capsuleId}" 
              style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px;">
              View Capsule Invitation
            </a>
          </p>

          <p>
            If you haven't already signed up on <strong>Yaadgaar</strong>, it's quick and easy! Just click the link above to join
            and enjoy a nostalgic journey through shared memories.
          </p>

          <p style="color: #777;">Warm regards,<br>The <strong>Yaadgaar</strong> Team</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new ErrorHandler(`Failed to send email to ${email}`, 500);
    }
  }
};

export{
    sendInvitationEmail
}
