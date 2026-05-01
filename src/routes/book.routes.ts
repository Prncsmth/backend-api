import { Router } from "express";
import { BookController } from "@/controllers/book.controller";
import { validate } from "@/middlewares/validate-schema";
import {
  createBookSchema,
  updateBookSchema,
  deleteBookSchema,
} from "@/validations/book.schema";

const router = Router();
const bookController = new BookController();

router.post("/v1/create-book", validate(createBookSchema), bookController.createBook);
router.get("/v1/get-book", bookController.getBooks);
router.put("/v1/put-book", validate(updateBookSchema), bookController.putBook);
router.delete("/v1/delete-book", validate(deleteBookSchema), bookController.deleteBook);

export default router;