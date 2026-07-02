ALTER TABLE "chat_messages" RENAME COLUMN "attachments" TO "attachment_url";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password_hash" SET NOT NULL;