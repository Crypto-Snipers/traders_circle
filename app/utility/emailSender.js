// emailSender.js

const getEmailConfig = () => {
  const senderEmail = "support@tradecartel.in";
  const emailPassword = "Manisha@ANG#13";
  const defaultRecipient = "upadhyaymanisha13@gmail.com";
  const smtpServer = "smtpout.secureserver.net";
  const smtpPort = 465;
  const companyName = "Trade Cartel";

  return {
    senderEmail,
    emailPassword,
    defaultRecipient,
    smtpServer,
    smtpPort,
    companyName,
  };
};

export async function sendEmail(subject, htmlBody, toEmail) {
  if (!subject) {
    throw new Error("Email subject is required");
  }

  // Dynamically import nodemailer only when function is called (server-side)
  const nodemailer = await import('nodemailer');
  
  const config = getEmailConfig();
  const recipient = toEmail || config.defaultRecipient;

  const transporter = nodemailer.default.createTransport({
    host: config.smtpServer,
    port: config.smtpPort,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: config.senderEmail,
      pass: config.emailPassword,
    },
    // Optional: Add these if you face connection issues
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"${config.companyName}" <${config.senderEmail}>`,
    to: recipient,
    subject: subject,
    html: htmlBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}