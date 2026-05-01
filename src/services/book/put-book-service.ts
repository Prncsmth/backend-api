import { BookRepository, BookData } from "@/repositories/book.repository";

export async function putBookService( id: string, data: BookData ) {
    const bookRepository = new BookRepository();

    try {
        const updatedBook = await bookRepository.put(id, data);
        return { code: 201, status: "success", message: "Book updated successfully", data: updatedBook };
    } catch (error) {
        console.error("Error updating book:", error);
        return { code: 500, status: "error" , message: "Failed to update book" };
    }
}