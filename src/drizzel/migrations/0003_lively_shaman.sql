CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event name" text NOT NULL,
	"date" date NOT NULL,
	"event status" boolean DEFAULT FALSE NOT NULL,
	"banner url" text NOT NULL,
	"images" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
