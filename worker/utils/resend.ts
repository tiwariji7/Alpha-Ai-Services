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
      background-color: #FAF8F6;
      color: #111827;
    }

    /* Mobile Responsive Styles */
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 12px 8px !important;
      }
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .fluid-padding {
        padding: 24px 18px !important;
      }
      .hero-title {
        font-size: 26px !important;
        line-height: 32px !important;
      }
      .stack-col {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
        padding: 0 0 10px 0 !important;
      }
      .stack-col-last {
        padding-bottom: 0 !important;
      }
      .info-card-cell {
        padding: 14px 14px !important;
      }
      .footer-cell {
        padding: 24px 18px !important;
      }
    }

    /* Dark Mode Preferences */
    @media (prefers-color-scheme: dark) {
      .body-bg {
        background-color: #080B11 !important;
      }
      .card-bg {
        background-color: #111723 !important;
        border-color: #1E2738 !important;
      }
      .subcard-bg {
        background-color: #161F2E !important;
        border-color: #233046 !important;
      }
      .support-bg {
        background-color: #191614 !important;
        border-color: #38251C !important;
      }
      .text-main {
        color: #F3F4F6 !important;
      }
      .text-body {
        color: #D1D5DB !important;
      }
      .text-muted {
        color: #9CA3AF !important;
      }
      .text-brand-light {
        color: #FFFFFF !important;
      }
      .social-circle {
        background-color: #1A2232 !important;
        border-color: #28364F !important;
      }
    }
  </style>
</head>
<body class="body-bg" style="margin: 0; padding: 0; background-color: #FAF8F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <!-- Outer Wrapper Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" class="body-bg" style="background-color: #FAF8F6; width: 100%;">
    <tr>
      <td align="center" style="padding: 24px 12px;" class="email-wrapper">
        
        <!-- Main Email Container (Max Width 600px) -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container" style="max-width: 600px; width: 100%; margin: 0 auto;">
          
          <!-- ==================== HEADER ==================== -->
          <tr>
            <td align="center" style="padding: 16px 12px 24px 12px; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                <tr>
                  <td align="center">
                    <a href="https://alphaaiservices.in" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="https://alphaaiservices.in/brandlogo.png" alt="Alpha Ai Services Logo" width="44" height="44" style="width: 44px; height: 44px; margin: 0 auto; display: block; border: 0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <span class="text-muted" style="font-size: 11px; font-weight: 700; letter-spacing: 1.6px; text-transform: uppercase; color: #8C867F; display: block;">
                      Thank you for reaching out to
                    </span>
                    <span class="text-main" style="font-size: 18px; font-weight: 800; letter-spacing: -0.3px; color: #111827; display: block; margin-top: 3px;">
                      Alpha <span style="color: #FF5A1F;">Ai</span> Services
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ==================== HERO CARD ==================== -->
          <tr>
            <td>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="card-bg" style="background-color: #FFFFFF; border: 1px solid #EDE9E4; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);">
                <tr>
                  <td class="fluid-padding" style="padding: 36px 32px 32px 32px;">
                    
                    <!-- Status Badge -->
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px auto;">
                      <tr>
                        <td align="center" style="background-color: #FFF4EE; border: 1px solid #FFD8C7; border-radius: 9999px; padding: 6px 14px; text-align: center;">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #FF5A1F; font-size: 12px; line-height: 1; font-weight: 900; padding-right: 6px;">&#10003;</td>
                              <td style="color: #FF5A1F; font-size: 10.5px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; line-height: 1;">
                                WE'VE RECEIVED YOUR MESSAGE
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Headline -->
                    <h1 class="hero-title text-main" style="font-size: 32px; font-weight: 800; color: #111827; letter-spacing: -0.6px; margin: 0 0 16px 0; line-height: 1.2; text-align: center;">
                      Thank <span style="color: #FF5A1F;">You!</span>
                    </h1>

                    <!-- Customer Greeting -->
                    <p class="text-main" style="font-size: 15px; line-height: 1.6; color: #111827; margin: 20px 0 12px 0; text-align: left;">
                      Hi <strong>${safeName}</strong>,
                    </p>

                    <!-- Confirmation Copy -->
                    <p class="text-body" style="font-size: 14px; line-height: 1.65; color: #4A4641; margin: 0 0 12px 0; text-align: left;">
                      We appreciate you contacting <strong>Alpha Ai Services</strong>. We have successfully received your enquiry.
                    </p>
                    <p class="text-body" style="font-size: 14px; line-height: 1.65; color: #4A4641; margin: 0 0 28px 0; text-align: left;">
                      Our team will review your request and connect with you as soon as possible.
                    </p>

                    <!-- Quick Trust / Response Highlights (Row of 3 Columns) -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                      <tr>
                        <!-- Highlight 1 -->
                        <td class="stack-col" width="31%" valign="top" style="padding-right: 3%;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; text-align: center; height: 100%;">
                            <tr>
                              <td style="padding: 14px 10px; text-align: center;">
                                <div style="width: 6px; height: 6px; background-color: #FF5A1F; border-radius: 50%; margin: 0 auto 6px auto;"></div>
                                <div class="text-main" style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 3px;">Prompt Response</div>
                                <div class="text-muted" style="font-size: 11px; line-height: 1.4; color: #6B6660;">We aim to respond promptly.</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Highlight 2 -->
                        <td class="stack-col" width="32%" valign="top" style="padding-right: 3%;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; text-align: center; height: 100%;">
                            <tr>
                              <td style="padding: 14px 10px; text-align: center;">
                                <div style="width: 6px; height: 6px; background-color: #FF5A1F; border-radius: 50%; margin: 0 auto 6px auto;"></div>
                                <div class="text-main" style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 3px;">Trusted Support</div>
                                <div class="text-muted" style="font-size: 11px; line-height: 1.4; color: #6B6660;">Reliable and secure assistance.</div>
                              </td>
                            </tr>
                          </table>
                        </td>

                        <!-- Highlight 3 -->
                        <td class="stack-col stack-col-last" width="31%" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; text-align: center; height: 100%;">
                            <tr>
                              <td style="padding: 14px 10px; text-align: center;">
                                <div style="width: 6px; height: 6px; background-color: #FF5A1F; border-radius: 50%; margin: 0 auto 6px auto;"></div>
                                <div class="text-main" style="font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 3px;">Client Focused</div>
                                <div class="text-muted" style="font-size: 11px; line-height: 1.4; color: #6B6660;">Your requirements matter to us.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- ==================== INFORMATION CARDS ==================== -->
                    <div class="text-muted" style="font-size: 11px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: #8C867F; margin-bottom: 12px; text-align: left;">
                      What to Expect
                    </div>

                    <!-- Card 1 -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; margin-bottom: 10px;">
                      <tr>
                        <td class="info-card-cell" style="padding: 14px 16px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30" valign="top" style="padding-right: 12px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #FFF4EE; border: 1px solid #FFD8C7; color: #FF5A1F; font-size: 11px; font-weight: 800; line-height: 24px; text-align: center;">
                                  1
                                </div>
                              </td>
                              <td valign="middle">
                                <div class="text-main" style="font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 2px;">What Happens Next?</div>
                                <div class="text-muted" style="font-size: 12px; line-height: 1.45; color: #6B6660;">Our team will review your message and get back to you as soon as possible.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Card 2 -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; margin-bottom: 10px;">
                      <tr>
                        <td class="info-card-cell" style="padding: 14px 16px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30" valign="top" style="padding-right: 12px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #FFF4EE; border: 1px solid #FFD8C7; color: #FF5A1F; font-size: 11px; font-weight: 800; line-height: 24px; text-align: center;">
                                  2
                                </div>
                              </td>
                              <td valign="middle">
                                <div class="text-main" style="font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 2px;">Expert Support</div>
                                <div class="text-muted" style="font-size: 12px; line-height: 1.45; color: #6B6660;">We're here to understand your requirements and provide the right solution.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Card 3 -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="subcard-bg" style="background-color: #FAF8F6; border: 1px solid #EDE9E4; border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td class="info-card-cell" style="padding: 14px 16px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td width="30" valign="top" style="padding-right: 12px;">
                                <div style="width: 24px; height: 24px; border-radius: 6px; background-color: #FFF4EE; border: 1px solid #FFD8C7; color: #FF5A1F; font-size: 11px; font-weight: 800; line-height: 24px; text-align: center;">
                                  3
                                </div>
                              </td>
                              <td valign="middle">
                                <div class="text-main" style="font-size: 13px; font-weight: 700; color: #111827; margin-bottom: 2px;">Your Privacy Matters</div>
                                <div class="text-muted" style="font-size: 12px; line-height: 1.45; color: #6B6660;">Your information is handled securely and responsibly.</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- ==================== SUPPORT CALLOUT ==================== -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="support-bg" style="background-color: #FFF8F5; border: 1px solid #FFE4D6; border-radius: 12px; margin-bottom: 28px;">
                      <tr>
                        <td style="padding: 20px 20px; text-align: center;">
                          <div class="text-main" style="font-size: 14px; font-weight: 700; color: #111827; margin-bottom: 4px;">
                            Need Assistance?
                          </div>
                          <div class="text-muted" style="font-size: 12.5px; line-height: 1.5; color: #6B6660; margin-bottom: 14px;">
                            If you have any questions, feel free to reach out to us directly.
                          </div>
                          <a href="mailto:support@alphaaiservices.in" style="display: inline-block; background-color: #FF5A1F; color: #FFFFFF; font-size: 12.5px; font-weight: 700; text-decoration: none; padding: 10px 20px; border-radius: 8px; letter-spacing: 0.2px;">
                            support@alphaaiservices.in
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- ==================== SOCIAL MEDIA ==================== -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="text-align: center;">
                      <tr>
                        <td align="center" style="padding-top: 4px; padding-bottom: 6px;">
                          <div class="text-main" style="font-size: 13.5px; font-weight: 700; color: #111827; margin-bottom: 3px;">
                            Stay Connected With Us
                          </div>
                          <div class="text-muted" style="font-size: 11.5px; color: #8C867F; margin-bottom: 16px;">
                            Follow us for updates, insights, and more.
                          </div>

                          <!-- 3 Social Icons -->
                          <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                            <tr>
                              <!-- Instagram -->
                              <td align="center" style="padding: 0 7px;">
                                <a href="https://www.instagram.com/alphaaiservices.in/?hl=en" target="_blank" title="Instagram" style="display: block; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; background-color: #FFF4EE; border: 1px solid #FFD8C7; text-align: center; text-decoration: none;" class="social-circle">
                                  <img src="https://img.icons8.com/ios-filled/50/FF5A1F/instagram-new.png" width="17" height="17" alt="Instagram" style="display: inline-block; vertical-align: middle; margin-top: 9px; width: 17px; height: 17px;" />
                                </a>
                              </td>

                              <!-- LinkedIn -->
                              <td align="center" style="padding: 0 7px;">
                                <a href="https://www.linkedin.com/in/tiwarijii/" target="_blank" title="LinkedIn" style="display: block; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; background-color: #FFF4EE; border: 1px solid #FFD8C7; text-align: center; text-decoration: none;" class="social-circle">
                                  <img src="https://img.icons8.com/ios-filled/50/FF5A1F/linkedin.png" width="17" height="17" alt="LinkedIn" style="display: inline-block; vertical-align: middle; margin-top: 9px; width: 17px; height: 17px;" />
                                </a>
                              </td>

                              <!-- GitHub -->
                              <td align="center" style="padding: 0 7px;">
                                <a href="https://github.com/tiwariji7" target="_blank" title="GitHub" style="display: block; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; background-color: #FFF4EE; border: 1px solid #FFD8C7; text-align: center; text-decoration: none;" class="social-circle">
                                  <img src="https://img.icons8.com/ios-filled/50/FF5A1F/github.png" width="17" height="17" alt="GitHub" style="display: inline-block; vertical-align: middle; margin-top: 9px; width: 17px; height: 17px;" />
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- ==================== FOOTER ==================== -->
                <tr>
                  <td class="footer-cell" style="background-color: #07090E; border-top: 2px solid #FF5A1F; padding: 30px 24px 24px 24px; text-align: center;">
                    
                    <!-- Footer Logo -->
                    <table border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 10px auto;">
                      <tr>
                        <td align="center">
                          <img src="https://alphaaiservices.in/brandlogo.png" alt="Alpha Ai Services" width="30" height="30" style="width: 30px; height: 30px; margin: 0 auto; display: block; border: 0;" />
                        </td>
                      </tr>
                    </table>

                    <!-- Footer Brand -->
                    <div style="color: #FFFFFF; font-size: 14px; font-weight: 800; letter-spacing: 0.2px; margin-bottom: 2px;">
                      Alpha <span style="color: #FF5A1F;">Ai</span> Services
                    </div>
                    <div style="color: #8C867F; font-size: 9.5px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; margin-bottom: 16px;">
                      AI &bull; SOFTWARE &bull; DIGITAL SOLUTIONS
                    </div>

                    <!-- Footer Quick Links -->
                    <div style="font-size: 12px; margin-bottom: 16px;">
                      <a href="https://alphaaiservices.in" target="_blank" style="color: #D1D5DB; text-decoration: none; margin: 0 8px; font-weight: 500;">Website</a>
                      <span style="color: #4B5563;">&bull;</span>
                      <a href="mailto:support@alphaaiservices.in" style="color: #FF5A1F; text-decoration: none; margin: 0 8px; font-weight: 600;">support@alphaaiservices.in</a>
                    </div>

                    <!-- Automated Notice -->
                    <div style="padding-top: 14px; border-top: 1px solid #161B26; color: #6B7280; font-size: 11px; line-height: 1.5; margin-bottom: 12px;">
                      This is an automated confirmation email.<br/>
                      Please do not reply to this email.
                    </div>

                    <!-- Copyright -->
                    <div style="color: #4B5563; font-size: 10.5px;">
                      &copy; 2026 Alpha Ai Services. All rights reserved.
                    </div>

                  </td>
                </tr>

              </table>
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
Thank you for reaching out to Alpha Ai Services.

Hi ${rawName},

We appreciate you contacting Alpha Ai Services.
We have successfully received your enquiry.

Our team will review your request and connect with you as soon as possible.

---
WHAT TO EXPECT:
• Fast Response: We aim to respond promptly.
• Trusted Support: Reliable and secure assistance.
• Client Focused: Your requirements matter to us.

Need Assistance?
If you have any questions, feel free to reach out to us directly:
support@alphaaiservices.in

Stay Connected With Us:
• Instagram: https://www.instagram.com/alphaaiservices.in/?hl=en
• LinkedIn: https://www.linkedin.com/in/tiwarijii/
• GitHub: https://github.com/tiwariji7

Alpha Ai Services
AI • SOFTWARE • DIGITAL SOLUTIONS
https://alphaaiservices.in

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
