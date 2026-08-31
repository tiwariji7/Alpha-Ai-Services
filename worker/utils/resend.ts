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
  const rawName = data.name.trim();

  const subject = 'Thank You for Contacting Alpha Ai Services';
  const safeTitle = sanitizeHtml(subject);

  const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>${safeTitle}</title>
  <style type="text/css">
    /* Base Resets */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
      display: block;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 100% !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #FFFFFF;
      color: #0B1F3A;
    }

    /* Mobile Responsive Styles */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 16px 12px !important;
      }
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .email-content {
        padding: 28px 20px !important;
      }
      .hero-title {
        font-size: 28px !important;
        line-height: 34px !important;
      }
      .footer-cell {
        padding: 24px 20px !important;
      }
    }

    /* Dark Mode Preferences */
    @media (prefers-color-scheme: dark) {
      .dark-body-bg {
        background-color: #060D17 !important;
      }
      .dark-card-bg {
        background-color: #0B1728 !important;
        border-color: #1A293D !important;
      }
      .dark-subcard-bg {
        background-color: #101F35 !important;
        border-color: #1E3350 !important;
      }
      .dark-text-primary {
        color: #F0F4F8 !important;
      }
      .dark-text-secondary {
        color: #94A3B8 !important;
      }
      .dark-text-muted {
        color: #64748B !important;
      }
      .dark-border {
        border-color: #1A293D !important;
      }
      .dark-link {
        color: #F0F4F8 !important;
      }
    }
  </style>
</head>
<body class="dark-body-bg" style="margin: 0; padding: 0; background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Outer Wrapper Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="dark-body-bg" style="background-color: #FFFFFF; width: 100%;">
    <tr>
      <td align="center" style="padding: 40px 16px;" class="email-wrapper">
        
        <!-- Main Email Container (Max Width 600px) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container dark-card-bg" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E6EAF0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(11, 31, 58, 0.04);">
          
          <!-- Main Content Body -->
          <tr>
            <td class="email-content" style="padding: 40px 36px 36px 36px; text-align: left;">
              
              <!-- Header / Category Badge -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 8px; height: 8px; background-color: #E56A3D; border-radius: 50%; vertical-align: middle;"></td>
                        <td style="padding-left: 8px; font-size: 11.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #0B1F3A;" class="dark-text-primary">
                          ENQUIRY RECEIVED
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Main Title -->
              <h1 class="hero-title dark-text-primary" style="font-size: 36px; font-weight: 800; color: #0B1F3A; letter-spacing: -0.8px; margin: 0 0 24px 0; line-height: 1.15; text-align: left;">
                Thank You!
              </h1>

              <!-- Greeting -->
              <p class="dark-text-primary" style="font-size: 15px; line-height: 1.6; color: #0B1F3A; margin: 0 0 16px 0;">
                Hi <strong>${safeName}</strong>,
              </p>

              <!-- Confirmation Message -->
              <p class="dark-text-secondary" style="font-size: 14.5px; line-height: 1.65; color: #526173; margin: 0 0 14px 0;">
                Thank you for contacting <strong>Alpha Ai Services</strong>.
              </p>
              
              <p class="dark-text-secondary" style="font-size: 14.5px; line-height: 1.65; color: #526173; margin: 0 0 14px 0;">
                We have successfully received your enquiry.
              </p>

              <p class="dark-text-secondary" style="font-size: 14.5px; line-height: 1.65; color: #526173; margin: 0 0 28px 0;">
                Our team will review your request and connect with you as soon as possible.
              </p>

              <!-- Need Immediate Assistance Section -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="dark-subcard-bg" style="background-color: #FAFCFF; border: 1px solid #E6EAF0; border-radius: 12px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <div class="dark-text-primary" style="font-size: 14.5px; font-weight: 700; color: #0B1F3A; margin-bottom: 6px;">
                      Need Immediate Assistance?
                    </div>
                    <div class="dark-text-secondary" style="font-size: 13.5px; line-height: 1.55; color: #526173; margin-bottom: 10px;">
                      If your query is urgent, feel free to reach out to us directly.
                    </div>
                    <div>
                      <a href="mailto:support@alphaaiservices.in" style="color: #E56A3D; font-size: 13.5px; font-weight: 600; text-decoration: none;">
                        support@alphaaiservices.in
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p class="dark-text-secondary" style="font-size: 14.5px; line-height: 1.65; color: #526173; margin: 0;">
                Thank you,<br />
                <strong class="dark-text-primary" style="color: #0B1F3A;">Alpha Ai Services</strong>
              </p>

            </td>
          </tr>

          <!-- ==================== FOOTER ==================== -->
          <tr>
            <td class="footer-cell dark-border" style="border-top: 1px solid #E6EAF0; padding: 28px 36px 32px 36px; text-align: center; background-color: #FFFFFF;">
              
              <!-- Company Name & Tagline -->
              <div class="dark-text-primary" style="color: #0B1F3A; font-size: 14px; font-weight: 800; letter-spacing: -0.2px; margin-bottom: 3px;">
                Alpha Ai Services
              </div>
              <div class="dark-text-muted" style="color: #7A8796; font-size: 10px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; margin-bottom: 18px;">
                Ai &bull; SOFTWARE &bull; DIGITAL SOLUTIONS
              </div>

              <!-- Primary Footer Links (Website & Support) -->
              <div style="font-size: 12.5px; margin-bottom: 14px;">
                <a href="https://alphaaiservices.in" target="_blank" class="dark-link" style="color: #0B1F3A; text-decoration: none; font-weight: 600; margin: 0 10px;">Website</a>
                <span class="dark-text-muted" style="color: #CBD5E1;">&bull;</span>
                <a href="mailto:support@alphaaiservices.in" class="dark-link" style="color: #0B1F3A; text-decoration: none; font-weight: 600; margin: 0 10px;">Support</a>
              </div>

              <!-- Social Links Row -->
              <div style="font-size: 12px; margin-bottom: 20px;">
                <a href="https://www.instagram.com/alphaaiservices.in/?hl=en" target="_blank" class="dark-text-secondary" style="color: #526173; text-decoration: none; font-weight: 500; margin: 0 8px;">Instagram</a>
                <span class="dark-text-muted" style="color: #CBD5E1;">&bull;</span>
                <a href="https://www.linkedin.com/in/tiwarijii/" target="_blank" class="dark-text-secondary" style="color: #526173; text-decoration: none; font-weight: 500; margin: 0 8px;">LinkedIn</a>
                <span class="dark-text-muted" style="color: #CBD5E1;">&bull;</span>
                <a href="https://github.com/tiwariji7" target="_blank" class="dark-text-secondary" style="color: #526173; text-decoration: none; font-weight: 500; margin: 0 8px;">GitHub</a>
              </div>

              <!-- Automated Email Notice -->
              <div class="dark-text-muted" style="color: #7A8796; font-size: 11px; line-height: 1.5; margin-bottom: 12px;">
                This is an automated confirmation email.<br />
                Please do not reply to this email.
              </div>

              <!-- Copyright -->
              <div class="dark-text-muted" style="color: #7A8796; font-size: 10.5px;">
                &copy; 2026 Alpha Ai Services. All rights reserved.
              </div>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
ENQUIRY RECEIVED

Thank You!

Hi ${rawName},

Thank you for contacting Alpha Ai Services.

We have successfully received your enquiry.

Our team will review your request and connect with you as soon as possible.

Need Immediate Assistance?

If your query is urgent, feel free to reach out to us directly.

support@alphaaiservices.in

Thank you,
Alpha Ai Services

This is an automated confirmation email.
Please do not reply to this email.

© 2026 Alpha Ai Services. All rights reserved.
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
