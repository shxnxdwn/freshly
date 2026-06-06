CREATE TYPE "public"."avatar_enum" AS ENUM('bear.png', 'cat.png', 'chicken.png', 'meerkat.png', 'panda.png');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT 'cat.png'::"public"."avatar_enum";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "avatar" SET DATA TYPE "public"."avatar_enum" USING "avatar"::"public"."avatar_enum";