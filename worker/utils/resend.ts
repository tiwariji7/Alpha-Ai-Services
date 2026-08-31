/**
 * Resend Email Utility and Templates for Worker Backend
 */

import { sanitizeHtml, formatMultilineToHtml, sanitizeSubject } from './validation';

export interface SendEmailOptions {
  apiKey: string;
  from: string;
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmailWithResend(
  options: SendEmailOptions
): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!options.apiKey) {
    console.error('RESEND_API_KEY is not configured in the worker environment.');
    return { success: false, error: 'Email service configuration error.' };
  }

  try {
    const payload: any = {
      from: options.from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
    };

    if (options.replyTo) {
      payload.reply_to = options.replyTo;
    }
    if (options.text) {
      payload.text = options.text;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('Resend API error response:', errorData);
      return { success: false, error: 'Failed to deliver email through provider.' };
    }

    const result: any = await res.json();
    return { success: true, id: result?.id };
  } catch (err) {
    console.error('Resend fetch exception in worker:', err);
    return { success: false, error: 'Network error while contacting email delivery service.' };
  }
}

/* =========================================================================
   PROJECT ENQUIRY TEMPLATES
   ========================================================================= */

export function buildProjectEnquiryAdminEmail(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  stage: string;
  budget?: string;
  timeline?: string;
  projectDetails: string;
}): { subject: string; html: string; text: string } {
  const safeName = sanitizeHtml(data.name);
  const safeEmail = sanitizeHtml(data.email);
  const safePhone = sanitizeHtml(data.phone);
  const safeCompany = sanitizeHtml(data.company || 'Not Specified');
  const safeService = sanitizeHtml(data.service);
  const safeStage = sanitizeHtml(data.stage);
  const safeBudget = sanitizeHtml(data.budget || 'Not Specified');
  const safeTimeline = sanitizeHtml(data.timeline || 'Not Specified');
  const safeDetailsHtml = formatMultilineToHtml(data.projectDetails);

  const cleanName = sanitizeSubject(data.name);
  const cleanService = sanitizeSubject(data.service);
  const subject = `🚀 New Project Enquiry: ${cleanName} (${cleanService})`;
  const safeTitle = sanitizeHtml(subject);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F6; color: #111111;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #EDE9E4; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <!-- Header -->
    <tr>
      <td style="background-color: #111111; padding: 24px 32px; text-align: left;">
        <span style="display: inline-block; color: #FF5A1F; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;">ALPHA AI SERVICES</span>
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">New Project Enquiry Received</h1>
      </td>
    </tr>
    
    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 14px; line-height: 1.6; color: #6B6660; margin-top: 0;">
          A new detailed project enquiry has been submitted through the <strong>/contact</strong> page.
        </p>

        <!-- Client Info Table -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; border: 1px solid #EDE9E4; border-radius: 12px; overflow: hidden;">
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; width: 35%; border-bottom: 1px solid #EDE9E4;">Client Name</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Work Email</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #FF5A1F; font-weight: 600; border-bottom: 1px solid #EDE9E4;">
              <a href="mailto:${safeEmail}" style="color: #FF5A1F; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Phone / WhatsApp</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">
              <a href="https://wa.me/91${safePhone}" style="color: #111111; text-decoration: none;">+91 ${safePhone} (WhatsApp)</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Company</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">${safeCompany}</td>
          </tr>
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Service Required</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; font-weight: bold; border-bottom: 1px solid #EDE9E4;">${safeService}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Project Stage</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">${safeStage}</td>
          </tr>
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Estimated Budget</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">${safeBudget}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111;">Timeline</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111;">${safeTimeline}</td>
          </tr>
        </table>

        <!-- Project Details Box -->
        <div style="margin-top: 24px;">
          <h3 style="font-size: 14px; font-weight: 700; color: #111111; margin-bottom: 8px;">Project Scope & Description:</h3>
          <div style="padding: 16px; background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; font-size: 13px; line-height: 1.6; color: #333333;">
            ${safeDetailsHtml}
          </div>
        </div>

        <!-- Quick Action Buttons -->
        <div style="margin-top: 28px; text-align: center;">
          <a href="mailto:${safeEmail}?subject=Re:%20Your%20Project%20Enquiry%20with%20Alpha%20AI%20Services" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: bold; margin-right: 8px;">Reply via Email</a>
          <a href="https://wa.me/91${safePhone}" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: bold;">Chat on WhatsApp</a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #FAF8F6; padding: 20px 32px; border-top: 1px solid #EDE9E4; text-align: center; font-size: 12px; color: #8C867F;">
        Alpha AI Services &bull; Enterprise AI & Custom Software Engineering Studio
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
New Project Enquiry Received

Client: ${data.name}
Email: ${data.email}
Phone: +91 ${data.phone}
Company: ${data.company || 'Not Specified'}
Service: ${data.service}
Stage: ${data.stage}
Budget: ${data.budget || 'Not Specified'}
Timeline: ${data.timeline || 'Not Specified'}

Project Details:
${data.projectDetails}
  `.trim();

  return { subject, html, text };
}

export function buildCustomerConfirmationEmail(data: {
  name: string;
}): { subject: string; html: string; text: string } {
  const safeName = sanitizeHtml(data.name);

  const subject = 'Thank You for Contacting Alpha AI Services';
  const safeTitle = sanitizeHtml(subject);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F6; color: #111111;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #EDE9E4; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <!-- Header -->
    <tr>
      <td style="background-color: #111111; padding: 28px 32px; text-align: left;">
        <span style="display: inline-block; color: #FF5A1F; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;">ALPHA AI SERVICES</span>
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Enquiry Received</h1>
      </td>
    </tr>
    
    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 15px; line-height: 1.6; color: #111111; margin-top: 0; margin-bottom: 16px;">
          Hi <strong>${safeName}</strong>,
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #4A4641; margin-top: 0; margin-bottom: 16px;">
          Thank you for reaching out to Alpha AI Services.
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #4A4641; margin-top: 0; margin-bottom: 24px;">
          We have successfully received your enquiry. Our team will connect with you as soon as possible.
        </p>

        <p style="font-size: 14px; line-height: 1.6; color: #111111; margin-top: 0; margin-bottom: 24px;">
          Thank you,<br/>
          <strong>Alpha AI Services</strong>
        </p>

        <div style="padding: 12px 16px; background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 8px; font-size: 12px; line-height: 1.5; color: #8C867F;">
          This is an automated confirmation email. Please do not reply to this email.
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #FAF8F6; padding: 20px 32px; border-top: 1px solid #EDE9E4; text-align: center; font-size: 12px; color: #8C867F;">
        Alpha AI Services &bull; <a href="https://alphaaiservices.in" style="color: #FF5A1F; text-decoration: none;">alphaaiservices.in</a>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
Hi ${data.name},

Thank you for reaching out to Alpha AI Services.

We have successfully received your enquiry. Our team will connect with you as soon as possible.

Thank you,
Alpha AI Services

This is an automated confirmation email. Please do not reply to this email.
  `.trim();

  return { subject, html, text };
}

export function buildProjectEnquiryCustomerEmail(data: {
  name: string;
  service?: string;
}): { subject: string; html: string; text: string } {
  return buildCustomerConfirmationEmail({ name: data.name });
}

/* =========================================================================
   QUICK INQUIRY TEMPLATES
   ========================================================================= */

export function buildQuickInquiryAdminEmail(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  contactMethod: string;
  message?: string;
}): { subject: string; html: string; text: string } {
  const safeName = sanitizeHtml(data.name);
  const safePhone = sanitizeHtml(data.phone);
  const safeEmail = sanitizeHtml(data.email);
  const safeService = sanitizeHtml(data.service);
  const safeMethod = sanitizeHtml(data.contactMethod);
  const safeMessageHtml = formatMultilineToHtml(data.message || 'None provided');

  const cleanName = sanitizeSubject(data.name);
  const cleanService = sanitizeSubject(data.service);
  const subject = `⚡ Quick Inquiry: ${cleanName} (${cleanService})`;
  const safeTitle = sanitizeHtml(subject);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F6; color: #111111;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #EDE9E4; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
    <!-- Header -->
    <tr>
      <td style="background-color: #111111; padding: 24px 32px; text-align: left;">
        <span style="display: inline-block; color: #FF5A1F; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px;">ALPHA AI SERVICES</span>
        <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">New Quick Inquiry Received</h1>
      </td>
    </tr>
    
    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <p style="font-size: 14px; line-height: 1.6; color: #6B6660; margin-top: 0;">
          A prospect has submitted a quick callback / inquiry modal request.
        </p>

        <!-- Details Table -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0; border: 1px solid #EDE9E4; border-radius: 12px; overflow: hidden;">
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; width: 35%; border-bottom: 1px solid #EDE9E4;">Name</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; border-bottom: 1px solid #EDE9E4;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">WhatsApp / Phone</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; font-weight: bold; border-bottom: 1px solid #EDE9E4;">
              <a href="https://wa.me/91${safePhone}" style="color: #111111; text-decoration: none;">+91 ${safePhone}</a>
            </td>
          </tr>
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Work Email</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #FF5A1F; font-weight: 600; border-bottom: 1px solid #EDE9E4;">
              <a href="mailto:${safeEmail}" style="color: #FF5A1F; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111; border-bottom: 1px solid #EDE9E4;">Service Interested</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; font-weight: bold; border-bottom: 1px solid #EDE9E4;">${safeService}</td>
          </tr>
          <tr style="background-color: #FAF8F6;">
            <td style="padding: 12px 16px; font-size: 13px; font-weight: bold; color: #111111;">Preferred Contact</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #111111; font-weight: bold;">${safeMethod}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="margin-top: 20px;">
          <h3 style="font-size: 14px; font-weight: 700; color: #111111; margin-bottom: 8px;">Project Note:</h3>
          <div style="padding: 14px; background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; font-size: 13px; line-height: 1.6; color: #333333;">
            ${safeMessageHtml}
          </div>
        </div>

        <!-- Action Links -->
        <div style="margin-top: 28px; text-align: center;">
          <a href="https://wa.me/91${safePhone}" style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: bold; margin-right: 8px;">Connect via WhatsApp</a>
          <a href="mailto:${safeEmail}?subject=Re:%20Inquiry%20with%20Alpha%20AI%20Services" style="display: inline-block; background-color: #111111; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: bold;">Send Email</a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #FAF8F6; padding: 20px 32px; border-top: 1px solid #EDE9E4; text-align: center; font-size: 12px; color: #8C867F;">
        Alpha AI Services &bull; Enterprise AI & Custom Software Engineering Studio
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
New Quick Inquiry Received

Client: ${data.name}
Phone: +91 ${data.phone}
Email: ${data.email}
Service: ${data.service}
Preferred Contact: ${data.contactMethod}

Note:
${data.message || 'None'}
  `.trim();

  return { subject, html, text };
}

export function buildQuickInquiryCustomerEmail(data: {
  name: string;
  service?: string;
  contactMethod?: string;
}): { subject: string; html: string; text: string } {
  return buildCustomerConfirmationEmail({ name: data.name });
}
