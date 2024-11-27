CREATE TABLE IF NOT EXISTS "exec" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stream" text NOT NULL,
	"email" text,
	CONSTRAINT "exec_email_unique" UNIQUE("email")
);
