/*
  Warnings:

  - Added the required column `filename` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimetype` to the `ImageUpload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user"."ImageUpload" ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimetype" TEXT NOT NULL;
