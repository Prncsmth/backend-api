import { z } from "zod";

const publishedYearField = z.coerce
  .string()
  .regex(/^\d+$/, "publishedYear must be a valid number")
  .nonempty("Published year is required");

export const createBookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  author: z.string().nonempty("Author is required"),
  publishedYear: publishedYearField,
  genre: z.string().nonempty("Genre is required"),
});

export const updateBookSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title cannot be empty").optional(),
  author: z.string().min(1, "Author cannot be empty").optional(),
  publishedYear: publishedYearField.optional(),
  genre: z.string().min(1, "Genre cannot be empty").optional(),
});

export const deleteBookSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type DeleteBookInput = z.infer<typeof deleteBookSchema>;