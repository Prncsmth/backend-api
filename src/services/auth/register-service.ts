import bcrypt from "bcrypt";
import { AuthRepository } from "@/repositories/auth.respository";
import crypto from "crypto";
import { sendVerificationEmail } from "@/utils/send-email";

const repo = new AuthRepository();

interface RegisterInput {
  email: string;
  password: string;
}

export const registerService = async (data: RegisterInput) => {
  try {
    const { email, password } = data;

    // check if user exists
    const existingUser = await repo.findByEmail(email);
    if (existingUser) {
      return {
        code: 400,
        message: "User already exists",
      };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // create user
    await repo.create({
      email,
      password: hashedPassword,
      verificationToken: token,
      verificationTokenExpiresAt: expiresAt,
    });

    // send email — isolated try/catch so real errors print to terminal
    try {
      await sendVerificationEmail(email, token);
    } catch (emailError) {
      console.error("Email send failed:", emailError); // <-- watch your terminal
      return {
        code: 500,
        message: "Account created but verification email failed to send.",
      };
    }

    return {
      code: 201,
      message: "User created. Please verify your email.",
    };

  } catch (error) {
    console.error(" Register error:", error); // <-- also log this
    return {
      code: 500,
      message: "Server error",
    };
  }
};