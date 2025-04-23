import nodemailer from "nodemailer";
import { ErrorHandler } from "./errorhandler.js";

const sendInvitationEmail = async (friendsEmails, capsuleId, sender, capsuleDetails) => {
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
      subject: "✨ A Magical Memory Awaits You on Yaadgaar! ✨",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; color: #32012F; background-color: #f4f4f8;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f8;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 15px 35px rgba(50, 1, 47, 0.15);">
                <!-- Premium Header Design -->
                <tr>
                  <td>
                    <div style="position: relative; overflow: hidden;">
                      <!-- Background with wave effect -->
                      <div style="background: linear-gradient(135deg, #32012F 0%, #440542 100%); padding: 60px 20px; text-align: center; position: relative; overflow: hidden;">
                        <!-- Decorative elements -->
                        <div style="position: absolute; top: -20px; right: -20px; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, rgba(247,90,90,0.3) 0%, rgba(255,169,85,0.1) 70%);"></div>
                        <div style="position: absolute; bottom: -40px; left: -40px; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(109,225,210,0.2) 0%, rgba(109,225,210,0) 70%);"></div>
                        
                        <!-- Logo and brand -->
                        <div style="position: relative; z-index: 2;">
                          <div style="display: inline-block; padding: 15px 25px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; margin-bottom: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                            <h1 style="margin: 0; font-family: serif, Georgia; font-size: 38px; background: linear-gradient(to right, #F75A5A, #FFA955, #6DE1D2); -webkit-background-clip: text; background-clip: text; color: transparent; display: inline-block;">
                              <span style="vertical-align: middle; font-size: 28px;">✨</span> 
                              Yaadgaar 
                              <span style="vertical-align: middle; font-size: 28px;">✨</span>
                            </h1>
                          </div>
                          <h2 style="color: white; font-weight: 300; margin: 5px 0 0; font-size: 22px; letter-spacing: 1px;">A Memory Capsule Awaits You</h2>
                        </div>
                      </div>
                      
                      <!-- Curved separator -->
                      <div style="height: 50px; background-color: #32012F; border-radius: 0 0 100% 100% / 0 0 100% 100%; margin-top: -25px; position: relative; z-index: 1;"></div>
                    </div>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <!-- Invitation message -->
                    <div style="text-align: center; margin-bottom: 30px; margin-top: -20px; position: relative; z-index: 2;">
                      <img src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png" alt="Envelope" width="80" style="margin-bottom: 15px; filter: drop-shadow(0 5px 15px rgba(50, 1, 47, 0.2));">
                      <h2 style="font-size: 24px; margin: 10px 0; background: linear-gradient(to right, #F75A5A, #FFA955); -webkit-background-clip: text; background-clip: text; color: transparent; display: inline-block;">A Special Invitation For You</h2>
                    </div>
                    
                    <!-- Personal greeting -->
                    <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">
                      Dear <strong style="color: #F75A5A;">${email.split('@')[0]}</strong>,
                    </p>
                    
                    <!-- Invitation message with animation-like design -->
                    <div style="background: linear-gradient(to right, rgba(247,90,90,0.08), rgba(109,225,210,0.08)); border-radius: 16px; padding: 25px; margin: 25px 0; border-left: 5px solid #F75A5A; position: relative; overflow: hidden;">
                      <div style="position: absolute; top: -30px; right: -30px; width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle, rgba(255,169,85,0.2) 0%, rgba(255,169,85,0) 70%);"></div>

                      <p style="font-size: 18px; line-height: 1.6; position: relative; z-index: 1;">
                        <strong style="color: #32012F; font-size: 20px;">${sender.name}</strong> has crafted a special Memory Capsule just for you on <strong>Yaadgaar</strong>!
                      </p>
                      
                      <p style="font-size: 16px; line-height: 1.6; color: #32012F; opacity: 0.9; position: relative; z-index: 1;">
                        They've preserved a meaningful moment to be shared with you at exactly the right time.
                      </p>
                    </div>
                    
                    <!-- Capsule details box -->
                    <div style="background: white; border-radius: 20px; padding: 5px; margin: 30px 0; box-shadow: 0 15px 35px rgba(50, 1, 47, 0.08); overflow: hidden; border: 1px solid rgba(109,225,210,0.2);">
                      <!-- Header -->
                      <div style="background: linear-gradient(to right, rgba(247,90,90,0.1), rgba(255,169,85,0.1)); padding: 15px 20px; border-bottom: 1px solid rgba(50, 1, 47, 0.05);">
                        <h3 style="margin: 0; color: #32012F; font-size: 18px; display: flex; align-items: center;">
                          <span style="background: linear-gradient(to right, #F75A5A, #FFA955); -webkit-background-clip: text; background-clip: text; color: transparent;">📦</span>
                          <span style="margin-left: 10px;">Memory Capsule Details</span>
                        </h3>
                      </div>
                      
                      <!-- Content -->
                      <div style="padding: 20px;">
                        <!-- Title -->
                        <div style="display: flex; margin-bottom: 20px; align-items: flex-start; padding-bottom: 15px; border-bottom: 1px dashed rgba(50, 1, 47, 0.1);">
                          <div style="min-width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #F75A5A, #FFA955); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">✨</div>
                          <div style="margin-left: 15px; flex: 1;">
                            <div style="font-size: 14px; color: #32012F; opacity: 0.7; margin-bottom: 5px;">Capsule Title</div>
                            <div style="font-weight: bold; color: #32012F; font-size: 18px;">${capsuleDetails.title}</div>
                          </div>
                        </div>
                        
                        <!-- Description -->
                        <div style="display: flex; margin-bottom: 20px; align-items: flex-start; padding-bottom: 15px; border-bottom: 1px dashed rgba(50, 1, 47, 0.1);">
                          <div style="min-width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #FFA955, #6DE1D2); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">📜</div>
                          <div style="margin-left: 15px; flex: 1;">
                            <div style="font-size: 14px; color: #32012F; opacity: 0.7; margin-bottom: 5px;">Capsule Description</div>
                            <div style="color: #32012F; line-height: 1.6;">${capsuleDetails.description}</div>
                          </div>
                        </div>
                        
                        <!-- Release Date -->
                        <div style="display: flex; align-items: flex-start;">
                          <div style="min-width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #6DE1D2, #F75A5A); display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;">📅</div>
                          <div style="margin-left: 15px; flex: 1;">
                            <div style="font-size: 14px; color: #32012F; opacity: 0.7; margin-bottom: 5px;">Release Date</div>
                            <div style="font-weight: bold; color: #32012F; font-size: 18px; padding: 5px 15px; background: rgba(109,225,210,0.1); display: inline-block; border-radius: 30px;">${new Date(capsuleDetails.releaseAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Message about the capsule -->
                    <div style="background: rgba(50, 1, 47, 0.02); border-radius: 16px; padding: 20px; margin: 25px 0; border: 1px dashed rgba(50, 1, 47, 0.1); position: relative;">
                      <div style="position: absolute; top: 10px; right: 10px; font-size: 30px; opacity: 0.1;">💌</div>
                      <p style="line-height: 1.8; color: #32012F; font-size: 16px;">
                        This Memory Capsule contains a surprise message, memory, or special moment that <strong>${sender.name}</strong> wanted to share with you.
                        <br><br>
                        Once the release date arrives, you'll be able to unlock and experience the surprise they've carefully prepared just for you.
                      </p>
                    </div>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 40px 0 20px;">
                      <div style="position: relative; display: inline-block;">
                        <!-- Button shadow/glow effect -->
                        <div style="position: absolute; inset: 0; background: linear-gradient(to right, #F75A5A, #FFA955); filter: blur(15px); opacity: 0.5; border-radius: 50px; transform: translateY(5px);"></div>
                        
                        <!-- Actual button -->
                        <a href="${process.env.HEHEHEHE}${email}?capsuleId=${capsuleId}" 
                          style="position: relative; display: inline-block; padding: 16px 40px; background: linear-gradient(to right, #F75A5A, #FFA955); 
                                color: white; text-decoration: none; font-weight: bold; font-size: 18px; letter-spacing: 0.5px; border-radius: 50px; 
                                box-shadow: 0 10px 25px rgba(247, 90, 90, 0.3); transition: all 0.3s ease;">
                          Unlock Your Memory Capsule
                        </a>
                      </div>
                      
                      <p style="margin-top: 20px; font-size: 14px; color: #32012F; opacity: 0.7;">
                        Not registered yet? No worries! The link will guide you through a simple signup process.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td>
                    <div style="background: linear-gradient(to right, #F8F8F8, #F0F0F5); border-top: 1px solid rgba(50, 1, 47, 0.05); padding: 30px; text-align: center;">
                      <p style="margin: 0 0 15px; color: #32012F; font-size: 16px;">Warm regards,</p>
                      <p style="margin: 0; font-weight: bold; color: #32012F; font-size: 16px;">The Yaadgaar Team</p>
                      
                      <div style="margin-top: 25px; padding-top: 25px; border-top: 1px dashed rgba(50, 1, 47, 0.1);">
                        <div style="font-family: serif, Georgia; font-size: 18px; color: #F75A5A; display: flex; align-items: center; justify-content: center; gap: 8px;">
                          <span>✨</span>
                          <span style="background: linear-gradient(to right, #F75A5A, #FFA955); -webkit-background-clip: text; background-clip: text; color: transparent;">Yaadgaar</span>
                          <span>✨</span>
                        </div>
                        <p style="margin-top: 10px; font-size: 14px; color: #32012F; opacity: 0.7;">Preserving Moments, Creating Memories</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Email footer note -->
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; margin: 0 auto;">
                <tr>
                  <td style="padding: 20px 10px; text-align: center; color: #32012F; opacity: 0.5; font-size: 12px;">
                    This is an automated message from Yaadgaar. Please do not reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new ErrorHandler(`Failed to send email to ${email}`, 500);
    }
  }
};

export { sendInvitationEmail };
