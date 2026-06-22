import { connectToDatabase } from '../../db/db_connection';
import { NextResponse } from 'next/server';
import { sendEmail } from '../../utility/emailSender';

const sanitize = (value: unknown) =>
  String(value ?? '')
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(request: Request) {
  try {
    const { name = '', email = '', phone = '', experience = '', message = '' } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: 'Name, email, and phone are required.' },
        { status: 400 },
      );
    }

    const { tradersMarathon } = await connectToDatabase();
    await tradersMarathon.insertOne({
      name,
      email,
      phone,
      experience,
      message,
      submittedAt: new Date(),
    });

    const subject = 'New Contact Form Submission';
    const htmlBody = `
      <h2>New Enquiry Received</h2>
      <p><strong>Name:</strong> ${sanitize(name)}</p>
      <p><strong>Email:</strong> ${sanitize(email)}</p>
      <p><strong>Phone:</strong> ${sanitize(phone)}</p>
      <p><strong>Experience:</strong> ${sanitize(experience)}</p>
      <p><strong>Message:</strong></p>
      <p>${sanitize(message).replace(/\n/g, '<br/>')}</p>
    `;

    try {
      await sendEmail(subject, htmlBody);
    } catch (emailError) {
      console.error('Failed to send admin notification email', emailError);
    }

    return NextResponse.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Failed to process contact form submission', error);
    return NextResponse.json(
      { message: 'Failed to submit contact form. Please try again later.' },
      { status: 500 },
    );
  }
}
