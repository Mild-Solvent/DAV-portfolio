import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, message, date } = body;

    // Validate required fields
    if (!email || !phone || !message || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the date
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email configuration
    // Note: You'll need to set up email service (like Nodemailer with SMTP, SendGrid, etc.)
    // For now, this is a placeholder that logs the data
    
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission - ${formattedDate}`,
      text: `
New contact form submission:

Date: ${formattedDate}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #d2a8ff 0%, #a371f7 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .content {
      background: #f6f8fa;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #d0d7de;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: 600;
      color: #1f6feb;
      display: block;
      margin-bottom: 5px;
    }
    .value {
      color: #24292f;
    }
    .message-box {
      background: white;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #d0d7de;
      margin-top: 10px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">📅 New Contact Form Submission</h2>
  </div>
  
  <div class="content">
    <div class="field">
      <span class="label">📅 Selected Date:</span>
      <span class="value">${formattedDate}</span>
    </div>
    
    <div class="field">
      <span class="label">📧 Email:</span>
      <span class="value">${email}</span>
    </div>
    
    <div class="field">
      <span class="label">📞 Phone:</span>
      <span class="value">${phone}</span>
    </div>
    
    <div class="field">
      <span class="label">💬 Message:</span>
      <div class="message-box">${message}</div>
    </div>
  </div>
</body>
</html>
      `
    };

    // TODO: Implement actual email sending
    // Example with Nodemailer (you'll need to install it and configure SMTP):
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
    });
    */

    // For development: Log the email data
    console.log('📧 Contact Form Submission:', emailData);

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
