import { AuthRepository } from "@/repositories/auth.respository";

const repo = new AuthRepository();

const successHTML = () => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Email Verified</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:80px 0;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;padding:48px;box-shadow:0 2px 8px rgba(0,0,0,0.08);text-align:center;">
              <tr>
                <td>
                  <div style="font-size:56px;"></div>
                  <h1 style="color:#111827;font-size:22px;margin:16px 0 8px;">Email Verified Successfully</h1>
                  <p style="color:#6B7280;font-size:15px;margin:0 0 32px;">
                    Your account is now active. You can close this tab and log in.
                  </p>
                  <a href="${process.env.FRONTEND_URL}/login"
                    style="display:inline-block;padding:12px 28px;background-color:#4F46E5;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">
                    Go to Login
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const errorHTML = (message: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Verification Failed</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:80px 0;">
        <tr>
          <td align="center">
            <table width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;padding:48px;box-shadow:0 2px 8px rgba(0,0,0,0.08);text-align:center;">
              <tr>
                <td>
                  <div style="font-size:56px;"></div>
                  <h1 style="color:#111827;font-size:22px;margin:16px 0 8px;">Verification Failed</h1>
                  <p style="color:#6B7280;font-size:15px;margin:0 0 32px;">${message}</p>
                  <a href="${process.env.FRONTEND_URL}/resend-verification"
                    style="display:inline-block;padding:12px 28px;background-color:#EF4444;color:#fff;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">
                    Resend Verification Email
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

export const verifyEmailService = async (token: string) => {
  const user = await repo.findByToken(token);

  if (!user) {
    return { code: 400, html: errorHTML("This link is invalid or has already been used.") };
  }

  if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < new Date()) {
    return { code: 400, html: errorHTML("This link has expired. Please request a new one.") };
  }

  await repo.verifyUser(user.id);

  return { code: 200, html: successHTML() };
};