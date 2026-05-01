import jwt from "jsonwebtoken";
import { AuthRepository } from "@/repositories/auth.respository";

const repo = new AuthRepository();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

interface RefreshTokenInput {
  refreshToken: string;
}

export const refreshTokenService = async (data: RefreshTokenInput) => {
  try {
    const { refreshToken } = data;

    // 1. Find user by the refresh token stored in DB
    const user = await repo.findByRefreshToken(refreshToken);

    // 2. If no user owns this token, it's invalid (never issued or already logged out)
    if (!user) {
      return { code: 401, message: "Invalid refresh token" };
    }

    // 3. Verify the JWT signature and expiry
    try {
      jwt.verify(refreshToken, REFRESH_SECRET);
    } catch {
      // Token is expired or tampered — clear it from DB and force re-login
      await repo.clearRefreshToken(user.id);
      return { code: 401, message: "Refresh token expired" };
    }

    // 4. Issue a fresh access token
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });

    return {
      code: 200,
      message: "Token refreshed",
      data: { accessToken },
    };

  } catch (error) {
    return { code: 500, message: "Server error" };
  }
};