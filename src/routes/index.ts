import { Router } from "express";
import bookRoutes from "@/routes/book.routes";
import authRoutes from "./auth.routes";
const router = Router();

router.use("/book", bookRoutes);
router.use("/auth", authRoutes);

export default router;