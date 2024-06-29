CREATE TABLE IF NOT EXISTS "event_attendees" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "event_user_unique" UNIQUE("event_id","user_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_id_idx" ON "event_attendees" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "event_attendees" USING btree ("user_id");