import { createBookService, deleteBookService } from "@/services/book";
import { getBookService } from "@/services/book";
import { putBookService } from "@/services/book/put-book-service";

export class BookController {
    async createBook( req: any, res: any ) {
        const {  title, author, publishedYear, genre } = req.body;

        const result = await createBookService({ title, author, publishedYear, genre });

        return res.status(result.code).json(result);
    }

    async getBooks( req: any, res: any ) {
        const result = await getBookService();

        return res.status(result.code).json(result);
    }
    async putBook( req: any, res: any ) {
        const { id, title, author, publishedYear, genre } = req.body;

        const result = await putBookService(id, { title, author, publishedYear, genre });

        return res.status(result.code).json(result);
    }
    async deleteBook( req: any, res: any ) {
        const { id } = req.body;
        const result = await deleteBookService(id);
        return res.status(result.code).json(result);
    }
}