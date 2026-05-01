import { Router } from "express";
import bookRoutes from "@/routes/book.routes";

const router = Router();

router.use("/book", bookRoutes);

export default router;