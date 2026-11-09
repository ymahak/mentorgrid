import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahaky15.vercel.app";

    // Send email with download links
    await transporter.sendMail({
      from: `"Mahak Yadav" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎁 Your Free Learning Resources from Mahak Yadav",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #FFF6EC;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #FF6B1A 0%, #FFC83D 100%); border-radius: 20px 20px 0 0; padding: 40px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 16px;">🎁</div>
              <h1 style="color: #140D08; margin: 0; font-size: 28px; font-weight: bold;">Your Free Resources Are Here!</h1>
              <p style="color: #4A3626; margin: 12px 0 0 0; font-size: 16px;">Thank you for joining our learning community</p>
            </div>
            
            <!-- Content -->
            <div style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
              <p style="color: #140D08; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                Hi there! 👋<br><br>
                I'm excited to share these learning resources with you. Click the links below to download your free study materials:
              </p>
              
              <!-- Resources -->
              <div style="margin: 24px 0;">
                <a href="${siteUrl}/resources/SQL_Notes.pdf" style="display: block; padding: 16px 20px; background: #FFF6EC; border-radius: 12px; text-decoration: none; margin-bottom: 12px; border-left: 4px solid #FF6B1A;">
                  <span style="font-size: 20px; margin-right: 12px;">📊</span>
                  <span style="color: #140D08; font-weight: 600;">SQL Complete Notes</span>
                  <span style="color: #FF6B1A; float: right;">Download →</span>
                </a>
                
                <a href="${siteUrl}/resources/DBMS_SQL_Notes.pdf" style="display: block; padding: 16px 20px; background: #FFF6EC; border-radius: 12px; text-decoration: none; margin-bottom: 12px; border-left: 4px solid #FF6B1A;">
                  <span style="font-size: 20px; margin-right: 12px;">🗄️</span>
                  <span style="color: #140D08; font-weight: 600;">DBMS & SQL Notes</span>
                  <span style="color: #FF6B1A; float: right;">Download →</span>
                </a>
                
                <a href="${siteUrl}/resources/Aptitude_Complete_Notes.pdf" style="display: block; padding: 16px 20px; background: #FFF6EC; border-radius: 12px; text-decoration: none; margin-bottom: 12px; border-left: 4px solid #FF6B1A;">
                  <span style="font-size: 20px; margin-right: 12px;">🧮</span>
                  <span style="color: #140D08; font-weight: 600;">Aptitude Notes (71 pages)</span>
                  <span style="color: #FF6B1A; float: right;">Download →</span>
                </a>
                
                <a href="${siteUrl}/resources/DeepBrain_AI_Guide.pdf" style="display: block; padding: 16px 20px; background: #FFF6EC; border-radius: 12px; text-decoration: none; margin-bottom: 12px; border-left: 4px solid #FF6B1A;">
                  <span style="font-size: 20px; margin-right: 12px;">🤖</span>
                  <span style="color: #140D08; font-weight: 600;">DeepBrain AI Guide</span>
                  <span style="color: #FF6B1A; float: right;">Download →</span>
                </a>
              </div>
              
              <!-- CTA -->
              <div style="text-align: center; margin: 32px 0;">
                <p style="color: #6B5B4F; font-size: 14px; margin: 0 0 16px 0;">Want personalized training?</p>
                <a href="${siteUrl}/contact" style="display: inline-block; background: #140D08; color: #FFF6EC; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 600;">
                  Book a Free Session
                </a>
              </div>
              
              <!-- Footer -->
              <div style="border-top: 1px solid #E5DDD5; padding-top: 24px; margin-top: 24px; text-align: center;">
                <p style="color: #6B5B4F; font-size: 14px; margin: 0;">
                  Happy Learning! 🚀<br>
                  <strong style="color: #140D08;">Mahak Yadav</strong><br>
                  Tech Mentor & Trainer
                </p>
                <div style="margin-top: 16px;">
                  <a href="https://wa.me/919817748915" style="color: #FF6B1A; text-decoration: none; margin: 0 8px;">WhatsApp</a>
                  <span style="color: #E5DDD5;">|</span>
                  <a href="${siteUrl}" style="color: #FF6B1A; text-decoration: none; margin: 0 8px;">Website</a>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Also send notification to admin
    await transporter.sendMail({
      from: `"MentorGrid" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📥 New Free Resources Download",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Lead from Free Resources Popup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Resources sent to your email!",
    });
  } catch (error) {
    console.error("Error sending free resources email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
