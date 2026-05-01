import { BookRepository, BookData } from "@/repositories/book.repository";

export async function deleteBookService(id: string) {
    const bookRepository = new BookRepository();

    try {
        const newBook = await bookRepository.delete(id);
        return { code: 201, status: "success", message: "Book deleted successfully", data: newBook };
    } catch (error) {
        console.error("Error deleting book:", error);
        return { code: 500, status: "error" , message: "Failed to delete book" };
    }
}