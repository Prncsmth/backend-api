import { Router } from "express";
import { BookController } from "@/controllers/book.controller";

const router = Router();
const bookController = new BookController();

router.post("/v1/create-book", bookController.createBook);
router.get("/v1/get-book", bookController.getBooks);
router.put("/v1/put-book/:id", bookController.putBook);

export default router;