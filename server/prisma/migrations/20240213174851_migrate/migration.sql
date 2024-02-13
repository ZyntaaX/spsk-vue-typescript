-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "forum";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "user"."User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "external_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login" TIMESTAMPTZ,
    "role_id" UUID,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."UserRole" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "news_w" BOOLEAN NOT NULL DEFAULT false,
    "user_w" BOOLEAN NOT NULL DEFAULT false,
    "calendar_w" BOOLEAN NOT NULL DEFAULT false,
    "calendar_r" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum"."Post" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "posted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "hide" BOOLEAN NOT NULL DEFAULT false,
    "author_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum"."PostCategory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "PostCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forum"."PostComment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "posted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "post_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_external_id_key" ON "user"."User"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"."User"("email");

-- AddForeignKey
ALTER TABLE "user"."User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user"."UserRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum"."Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum"."Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "forum"."PostCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum"."PostComment" ADD CONSTRAINT "PostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "forum"."Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forum"."PostComment" ADD CONSTRAINT "PostComment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
