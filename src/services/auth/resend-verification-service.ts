import { AuthRepository } from "@/repositories/auth.respository";
import { sendVerificationEmail } from "@/utils/send-email";
import crypto from "crypto";

const repo = new AuthRepository();

interface ResendVerificationInput {
  email: string;
}

export const resendVerificationService = async (data: ResendVerificationInput) => {
  try {
    const { email } = data;

    // 1. Find user by email
    const user = await repo.findByEmail(email);

    // 2. If not found
    if (!user) {
      return { code: 404, message: "User not found" };
    }

    // 3. If already verified
    if (user.isVerified) {
      return { code: 400, message: "Email already verified" };
    }

    // 4. Cooldown check — block if token was issued less than 1 minute ago and hasn't expired yet
    if (user.verificationTokenExpiresAt) {
      const tokenAge = user.verificationTokenExpiresAt.getTime() - Date.now();
      const oneMinuteInMs = 60 * 1000;
      const fifteenMinutesInMs = 15 * 60 * 1000;

      // Token is still fresh (issued less than 1 min ago) if its remaining time > 14 minutes
      if (tokenAge > 0 && tokenAge > fifteenMinutesInMs - oneMinuteInMs) {
        return { code: 429, message: "Please wait before requesting again" };
      }
    }

    // 5. Generate new token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    // 6. Update user record
    await repo.updateVerificationToken(user.id, token, expiresAt);

    // 7. Send email
    await sendVerificationEmail(user.email, token);

    // 8. Return success
    return { code: 200, message: "Verification email sent" };

  } catch (error) {
    return { code: 500, message: "Server error" };
  }
};