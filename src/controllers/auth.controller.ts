import { registerService } from "@/services/auth/register-service";
import { loginService } from "@/services/auth/login-service";
import { verifyEmailService } from "@/services/auth/verify-email-service";
import { resendVerificationService } from "@/services/auth/resend-verification-service";
import { refreshTokenService } from "@/services/auth/refresh-token-service";
import { logoutService } from "@/services/auth/logout-service";


export class AuthController {
  async register(req: any, res: any) {
    const { email, password } = req.body;

    const result = await registerService({ email, password });

    return res.status(result.code).json(result);
  }

  async login(req: any, res: any) {
    const { email, password } = req.body;

    const result = await loginService({ email, password });

    return res.status(result.code).json(result);
  }
  async verifyEmail(req: any, res: any) {
    const { token } = req.query;
    const result = await verifyEmailService(token);
    return res.status(result.code).send(result.html); // .send() not .json()
  }
  async resendVerification(req: any, res: any) {
    const { email } = req.body;
    const result = await resendVerificationService({ email });
    return res.status(result.code).json(result);
  }

  async refreshToken(req: any, res: any) {
    const { refreshToken } = req.body;
    const result = await refreshTokenService({ refreshToken });
    return res.status(result.code).json(result);
  }
  async logout(req: any, res: any) {
    const { refreshToken } = req.body;
    const result = await logoutService({ refreshToken });
    return res.status(result.code).json(result);
  }
}