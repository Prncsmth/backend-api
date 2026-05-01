import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "@/repositories/auth.respository";

const repo = new AuthRepository();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret";

interface LoginInput {
    email: string;
    password: string;
}

export const loginService = async (data: LoginInput) => {
    try {
        const { email, password } = data;

        // find user
        const user = await repo.findByEmail(email);
        if (!user) {
            return {
                code: 400,
                message: "Invalid email or password",
            };
        }
        if (!user.isVerified) {
            return {
                code: 403,
                message: "Verify your email first",
            };
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                code: 400,
                message: "Invalid email or password",
            };
        }

        // generate tokens
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ userId: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

        await repo.saveRefreshToken(user.id, refreshToken);

        return {
            code: 200,
            message: "Login successful",
            data: { accessToken, refreshToken },
        };
    } catch (error) {
        return {
            code: 500,
            message: "Server error",
        };
    }
};