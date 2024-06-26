CREATE TABLE IF NOT EXISTS "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"maxAttnd" numeric NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "experiences" USING btree ("user_id");