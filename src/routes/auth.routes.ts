import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { validate } from "@/middlewares/validate-schema";
import { registerSchema, loginSchema } from "@/validations/auth.schema";

const router = Router();
const authController = new AuthController();

router.post("/v1/register", validate(registerSchema), authController.register);
router.post("/v1/login", validate(loginSchema), authController.login);
router.get("/v1/verify-email", authController.verifyEmail);
router.post("/v1/resend-verification", authController.resendVerification);
router.post("/v1/refresh-token", authController.refreshToken);
router.post("/v1/logout", authController.logout);

export default router;