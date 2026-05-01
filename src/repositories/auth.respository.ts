import { prisma } from "@/lib/prisma";

export interface CreateUserData {
    email: string;
    password: string;
    isVerified?: boolean;
    verificationToken?: string;
    verificationTokenExpiresAt?: Date;  // ADD THIS
}

export class AuthRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    async create(data: CreateUserData) {
        return prisma.user.create({
            data,
        });
    }
    async findByToken(token: string) {
        return prisma.user.findFirst({
            where: { verificationToken: token },
        });
    }

    async verifyUser(id: string) {
        return prisma.user.update({
            where: { id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,  // ADD THIS to existing method
            },
        });
    }

    async updateVerificationToken(id: string, token: string, expiresAt: Date) {
        return prisma.user.update({
            where: { id },
            data: { verificationToken: token, verificationTokenExpiresAt: expiresAt },
        });
    }
    async saveRefreshToken(id: string, token: string) {
        return prisma.user.update({
            where: { id },
            data: { refreshToken: token },
        });
    }
    async findByRefreshToken(token: string) {
        return prisma.user.findFirst({
            where: { refreshToken: token },
        });
    }
    async clearRefreshToken(id: string) {
        return prisma.user.update({
            where: { id },
            data: { refreshToken: null },
        });
    }
}