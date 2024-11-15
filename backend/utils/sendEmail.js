import nodemailer from "nodemailer";
const { ErrorHandler } = require("./errorhandler.js");

const sendInvitationEmail = async (friendsEmails, capsuleId) => {
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
      subject: "You've been invited to a capsule!",
      html: `
        <p>You have been invited to a capsule! Click the link below to join:</p>
        <a href="https://digital-capsule.vercel.app/capsule/invite/${email}?capsuleId=${capsuleId}">Join Capsule</a>
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
