import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  service: string;
  message: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.service || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const data = {
      name: sanitize(body.name),
      company: body.company ? sanitize(body.company) : '',
      email: sanitize(body.email),
      service: sanitize(body.service),
      message: sanitize(body.message),
    };

    // Save to Supabase
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: data.name,
        company: data.company || null,
        email: data.email,
        service: data.service,
        message: data.message,
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
    }

    // Send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL || 'hello@blackwolfsec.io';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || '587'),
        secure: smtpPort === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Blackwolf Website" <${smtpUser}>`,
        to: contactEmail,
        replyTo: data.email,
        subject: `New Contact: ${data.name} — ${data.service}`,
        text: [
          `Name: ${data.name}`,
          `Company: ${data.company || 'N/A'}`,
          `Email: ${data.email}`,
          `Service: ${data.service}`,
          ``,
          `Message:`,
          data.message,
        ].join('\n'),
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #000;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;">${data.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Company</td><td style="padding: 8px 0;">${data.company || 'N/A'}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Service</td><td style="padding: 8px 0;">${data.service}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 4px;">
              <p style="color: #666; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
