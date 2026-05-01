import { BookRepository, BookData } from "@/repositories/book.repository";

export async function getBookService() {
    const bookRepository = new BookRepository();

    try {
        const newBook = await bookRepository.get();
        return { code: 201, status: "success", message: "Books fetched successfully", data: newBook };
    } catch (error) {
        console.error("Error getting book:", error);
        return { code: 500, status: "error" , message: "Failed to fetch books" };
    }
}