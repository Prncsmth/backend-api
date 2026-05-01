import { BookRepository, BookData } from "@/repositories/book.repository";

export async function createBookService( data: BookData ) {
    const bookRepository = new BookRepository();

    try {
        const newBook = await bookRepository.create(data);
        return { code: 201, status: "success", message: "Book created successfully", data: newBook };
    } catch (error) {
        console.error("Error creating book:", error);
        return { code: 500, status: "error" , message: "Failed to create book" };
    }
}