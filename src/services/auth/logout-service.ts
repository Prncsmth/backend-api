import { AuthRepository } from "@/repositories/auth.respository";

const repo = new AuthRepository();

interface LogoutInput {
  refreshToken: string;
}

export const logoutService = async (data: LogoutInput) => {
  try {
    const { refreshToken } = data;

    // 1. Find user by their stored refresh token
    const user = await repo.findByRefreshToken(refreshToken);

    // 2. If not found, the token is invalid or already cleared
    if (!user) {
      return { code: 400, message: "Invalid token" };
    }

    // 3. Wipe the refresh token from the DB
    await repo.clearRefreshToken(user.id);

    return { code: 200, message: "Logged out successfully" };

  } catch (error) {
    return { code: 500, message: "Server error" };
  }
};