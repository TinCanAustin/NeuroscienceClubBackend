ALTER TABLE "exec" DROP CONSTRAINT "exec_email_unique";--> statement-breakpoint
ALTER TABLE "exec" ADD COLUMN "linkedin" text;--> statement-breakpoint
ALTER TABLE "exec" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "exec" ADD CONSTRAINT "exec_linkedin_unique" UNIQUE("linkedin");