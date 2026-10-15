BEGIN;

ALTER TABLE "users" ADD COLUMN "display_id" VARCHAR(8);
WITH numbered_users AS (
    SELECT "user_id", ROW_NUMBER() OVER (ORDER BY "user_id") AS row_number
    FROM "users"
)
UPDATE "users" AS target
SET "display_id" = LPAD(numbered_users.row_number::text, 8, '0')
FROM numbered_users
WHERE target."user_id" = numbered_users."user_id";
ALTER TABLE "users" ALTER COLUMN "display_id" SET NOT NULL;

ALTER TABLE "users" ADD COLUMN "_migration_user_id" UUID;
UPDATE "users" SET "_migration_user_id" = gen_random_uuid();
ALTER TABLE "users" ALTER COLUMN "_migration_user_id" SET NOT NULL;

ALTER TABLE "bookmarks" ADD COLUMN "_migration_user_id" UUID;
UPDATE "bookmarks" AS bookmark
SET "_migration_user_id" = users."_migration_user_id"
FROM "users"
WHERE bookmark."user_id" = users."user_id";
ALTER TABLE "bookmarks" ALTER COLUMN "_migration_user_id" SET NOT NULL;

ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_ibfk_1";
DROP INDEX IF EXISTS "user_id";
ALTER TABLE "bookmarks" DROP COLUMN "user_id";
ALTER TABLE "bookmarks" RENAME COLUMN "_migration_user_id" TO "user_id";
CREATE INDEX "user_id" ON "bookmarks"("user_id");

ALTER TABLE "users" DROP CONSTRAINT "users_pkey";
ALTER TABLE "users" DROP COLUMN "user_id";
ALTER TABLE "users" RENAME COLUMN "_migration_user_id" TO "user_id";
ALTER TABLE "users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("user_id");
CREATE UNIQUE INDEX "users_display_id_key" ON "users"("display_id");

ALTER TABLE "bookmarks"
ADD CONSTRAINT "bookmarks_ibfk_1"
FOREIGN KEY ("user_id") REFERENCES "users"("user_id")
ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT;