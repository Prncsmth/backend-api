import { prisma } from "@/lib/prisma";

export interface BookData {
    title: string;
    author: string;
    publishedYear: string;
    genre: string;

}

export class BookRepository {
    async create( data: BookData ) {
        return prisma.book.create({ data });
    }

    async get() {
        return prisma.book.findMany();
    }

    async put( id: string, data: BookData ) {
        return prisma.book.update({ where: { id }, data });
    }   
    async delete( id: string ) {
        return prisma.book.delete({ where: { id } });
    }   
}
