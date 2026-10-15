-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "bookmark_tags" (
    "bookmark_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "bookmark_tags_pkey" PRIMARY KEY ("bookmark_id","tag_id")
);

-- CreateTable
CREATE TABLE "bookmarks" (
    "bookmark_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "note" TEXT,
    "is_visited" BOOLEAN DEFAULT false,
    "is_starred" BOOLEAN DEFAULT false,
    "is_private" BOOLEAN DEFAULT false,
    "saved_on" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("bookmark_id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "tag" VARCHAR(255),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "tag_id" ON "bookmark_tags"("tag_id");

-- CreateIndex
CREATE INDEX "user_id" ON "bookmarks"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag" ON "tags"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_ibfk_1" FOREIGN KEY ("bookmark_id") REFERENCES "bookmarks"("bookmark_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_ibfk_2" FOREIGN KEY ("tag_id") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;
