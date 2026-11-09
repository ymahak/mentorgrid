import nodemailer from "nodemailer";

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password, not regular password
  },
});

interface EnquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  courseInterested?: string;
  education?: string;
  learningGoals?: string;
  message: string;
}

export async function sendEnquiryNotification(data: EnquiryEmailData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "ymahaky@gmail.com",
    subject: `🎓 New Enquiry from ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #FFF6EC; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 3px solid #140D08; }
          .header { background-color: #140D08; color: #FFF6EC; padding: 24px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 8px 0 0; color: #C9B9A8; font-size: 14px; }
          .content { padding: 24px; }
          .field { margin-bottom: 16px; padding: 12px; background-color: #FFF6EC; border-radius: 8px; border-left: 4px solid #FF6B1A; }
          .field-label { font-size: 12px; color: #6B5847; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #140D08; font-weight: 500; }
          .message-box { background-color: #FFF6EC; padding: 16px; border-radius: 8px; border: 2px solid #E3CDB4; margin-top: 16px; }
          .message-box p { margin: 0; color: #4A3626; line-height: 1.6; }
          .footer { background-color: #140D08; color: #C9B9A8; padding: 16px; text-align: center; font-size: 12px; }
          .badge { display: inline-block; background-color: #FF6B1A; color: #140D08; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
          .cta { display: inline-block; background-color: #FF6B1A; color: #140D08; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div style="padding: 20px; background-color: #FFF6EC;">
          <div class="container">
            <div class="header">
              <h1>📩 New Course Enquiry</h1>
              <p>Someone is interested in learning with you!</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${data.name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${data.email}" style="color: #FF6B1A;">${data.email}</a></div>
              </div>
              
              ${data.phone ? `
              <div class="field">
                <div class="field-label">Phone</div>
                <div class="field-value"><a href="tel:${data.phone}" style="color: #FF6B1A;">${data.phone}</a></div>
              </div>
              ` : ''}
              
              ${data.courseInterested ? `
              <div class="field">
                <div class="field-label">Course Interested</div>
                <div class="field-value"><span class="badge">${data.courseInterested}</span></div>
              </div>
              ` : ''}
              
              ${data.education ? `
              <div class="field">
                <div class="field-label">Education</div>
                <div class="field-value">${data.education}</div>
              </div>
              ` : ''}
              
              ${data.learningGoals ? `
              <div class="field">
                <div class="field-label">Learning Goals</div>
                <div class="field-value">${data.learningGoals}</div>
              </div>
              ` : ''}
              
              <div class="message-box">
                <div class="field-label" style="margin-bottom: 8px;">Message</div>
                <p>${data.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${data.email}?subject=Re: Your Enquiry at Mahak Yadav Training" class="cta">
                  Reply to ${data.name} →
                </a>
              </div>
            </div>
            <div class="footer">
              <p>This enquiry was submitted through your website</p>
              <p style="color: #FF6B1A; margin-top: 8px;">mahakyadav.com</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Enquiry Received!

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.courseInterested ? `Course Interested: ${data.courseInterested}` : ''}
${data.education ? `Education: ${data.education}` : ''}
${data.learningGoals ? `Learning Goals: ${data.learningGoals}` : ''}

Message:
${data.message}

---
Reply to this enquiry by emailing ${data.email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Enquiry notification email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending enquiry notification email:", error);
    return { success: false, error };
  }
}

// Send confirmation email to the person who submitted the enquiry
export async function sendEnquiryConfirmation(data: EnquiryEmailData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: `Thanks for reaching out, ${data.name}! 🎓`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #FFF6EC; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 3px solid #140D08; }
          .header { background-color: #140D08; color: #FFF6EC; padding: 32px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 32px; }
          .highlight { background-color: #FFF6EC; padding: 20px; border-radius: 12px; border-left: 4px solid #FF6B1A; margin: 20px 0; }
          .footer { background-color: #140D08; color: #C9B9A8; padding: 24px; text-align: center; }
          .cta { display: inline-block; background-color: #FF6B1A; color: #140D08; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; }
          a { color: #FF6B1A; }
        </style>
      </head>
      <body>
        <div style="padding: 20px; background-color: #FFF6EC;">
          <div class="container">
            <div class="header">
              <h1>Thanks for reaching out! 🙌</h1>
            </div>
            <div class="content">
              <p style="font-size: 16px; color: #4A3626; line-height: 1.6;">
                Hi <strong>${data.name}</strong>,
              </p>
              <p style="font-size: 16px; color: #4A3626; line-height: 1.6;">
                Thank you for your interest in learning with me! I've received your enquiry and will get back to you within <strong>24 hours</strong>.
              </p>
              
              <div class="highlight">
                <p style="margin: 0; color: #140D08; font-size: 15px;">
                  <strong>What happens next?</strong><br><br>
                  ✅ I'll review your enquiry<br>
                  ✅ We'll schedule a free consultation call<br>
                  ✅ Discuss your learning goals and create a personalized plan
                </p>
              </div>
              
              <p style="font-size: 16px; color: #4A3626; line-height: 1.6;">
                In the meantime, feel free to:
              </p>
              <ul style="color: #4A3626; line-height: 1.8;">
                <li>Check out my <a href="https://mahakyadav.com/courses">courses</a></li>
                <li>Read my <a href="https://mahakyadav.com/blog">blog articles</a></li>
                <li>Connect with me on <a href="https://www.linkedin.com/in/mahak-42675a39b/">LinkedIn</a></li>
              </ul>
              
              <p style="font-size: 16px; color: #4A3626; line-height: 1.6;">
                Looking forward to helping you on your learning journey!
              </p>
              
              <p style="font-size: 16px; color: #140D08; margin-top: 24px;">
                <strong>Mahak Yadav</strong><br>
                <span style="color: #6B5847;">Tech Mentor & Trainer</span>
              </p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or WhatsApp me</p>
              <p style="margin-top: 12px;">
                <a href="https://wa.me/919817748915" style="color: #FF6B1A; text-decoration: none;">
                  📱 +91 98177 48915
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${data.name},

Thank you for your interest in learning with me! I've received your enquiry and will get back to you within 24 hours.

What happens next?
- I'll review your enquiry
- We'll schedule a free consultation call
- Discuss your learning goals and create a personalized plan

Looking forward to helping you on your learning journey!

Mahak Yadav
Tech Mentor & Trainer

Questions? WhatsApp me at +91 98177 48915
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Enquiry confirmation email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending enquiry confirmation email:", error);
    return { success: false, error };
  }
}
