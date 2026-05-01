import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const link = `${process.env.BACKEND_URL}/api/auth/v1/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: "Verify your email address",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Verify Your Email</title>
        </head>
        <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background-color:#4F46E5;padding:32px;text-align:center;">
                      <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">
                        ${process.env.APP_NAME}
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px 48px;">
                      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">
                        Verify your email address
                      </h2>
                      <p style="margin:0 0 24px;color:#6B7280;font-size:15px;line-height:1.6;">
                        Thanks for signing up! Click the button below to verify your email address. 
                        This link will expire in <strong>15 minutes</strong>.
                      </p>

                      <!-- Button -->
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="border-radius:6px;background-color:#4F46E5;">
                            <a href="${link}"
                              target="_blank"
                              style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin:24px 0 0;color:#9CA3AF;font-size:13px;line-height:1.6;">
                        If the button doesn't work, copy and paste this link into your browser:
                        <br/>
                        <a href="${link}" style="color:#4F46E5;word-break:break-all;">${link}</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color:#F9FAFB;padding:24px 48px;text-align:center;">
                      <p style="margin:0;color:#9CA3AF;font-size:12px;">
                        If you didn't create an account, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
};