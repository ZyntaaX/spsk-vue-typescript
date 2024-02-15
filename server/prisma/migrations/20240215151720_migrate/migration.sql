/*
  Warnings:

  - Added the required column `profile_piccture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user"."User" ADD COLUMN     "profile_piccture" BYTEA NOT NULL;

-- CreateTable
CREATE TABLE "user"."ImageUpload" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "buffer" BYTEA NOT NULL,
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "ImageUpload_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user"."ImageUpload" ADD CONSTRAINT "ImageUpload_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
