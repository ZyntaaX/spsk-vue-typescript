/*
  Warnings:

  - You are about to drop the column `profile_piccture` on the `User` table. All the data in the column will be lost.
  - Added the required column `profile_picture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user"."User" DROP COLUMN "profile_piccture",
ADD COLUMN     "profile_picture" BYTEA NOT NULL;
