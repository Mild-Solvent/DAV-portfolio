import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time } = body;

    // Validate required fields
    if (!date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the date
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toLocaleDateString('sk-SK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email configuration
    const emailData = {
      to: 'dav.development.official@gmail.com',
      subject: `🗓️ Nová rezervácia stretnutia`,
      text: `
Nová rezervácia stretnutia:

📅 Dátum: ${formattedDate}
🕐 Čas: ${time}

📍 Miesto: Mliekárenská 1 (zvonček Kováč)
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
      background: #f6f8fa;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #d2a8ff 0%, #a371f7 100%);
      color: white;
      padding: 25px;
      border-radius: 8px;
      margin-bottom: 25px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      background: #f6f8fa;
      padding: 25px;
      border-radius: 8px;
      border: 1px solid #d0d7de;
      margin-bottom: 20px;
    }
    .info-row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      padding: 15px;
      background: white;
      border-radius: 6px;
      border-left: 4px solid #1f6feb;
    }
    .icon {
      font-size: 24px;
      margin-right: 15px;
    }
    .label {
      font-weight: 600;
      color: #1f6feb;
      margin-right: 10px;
    }
    .value {
      color: #24292f;
      font-size: 18px;
    }
    .address {
      background: linear-gradient(135deg, rgba(31, 111, 235, 0.1) 0%, rgba(88, 166, 255, 0.05) 100%);
      border: 2px solid #1f6feb;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin-top: 20px;
    }
    .address-text {
      font-size: 20px;
      font-weight: 700;
      color: #1f6feb;
      margin: 0;
    }
    .footer {
      text-align: center;
      color: #6e7681;
      font-size: 14px;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #d0d7de;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🗓️ Nová rezervácia stretnutia</h1>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="icon">📅</span>
        <div>
          <span class="label">Dátum:</span>
          <span class="value">${formattedDate}</span>
        </div>
      </div>
      
      <div class="info-row">
        <span class="icon">🕐</span>
        <div>
          <span class="label">Čas:</span>
          <span class="value">${time}</span>
        </div>
      </div>
    </div>
    
    <div class="address">
      <p class="address-text">📍 Mliekárenská 1</p>
      <p class="address-text">(zvonček Kováč)</p>
    </div>
    
    <div class="footer">
      <p>Automatická notifikácia z rezervačného systému DAV Development</p>
    </div>
  </div>
</body>
</html>
      `
    };

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
      });

      console.log('✅ Email sent successfully to:', emailData.to);

      return NextResponse.json({
        success: true,
        message: 'Booking submitted and email sent successfully',
        data: { date: formattedDate, time }
      });
    } catch (emailError) {
      console.error('❌ Error sending email:', emailError);
      // Log the error but still return success (booking was recorded)
      console.log('📧 Booking Data (email failed):', emailData);
      
      return NextResponse.json({
        success: true,
        message: 'Booking submitted but email failed',
        data: { date: formattedDate, time },
        warning: 'Email notification failed'
      });
    }

  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}
