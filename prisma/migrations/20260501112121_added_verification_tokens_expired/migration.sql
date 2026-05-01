-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);
