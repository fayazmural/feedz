CREATE TABLE IF NOT EXISTS "feedbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" text,
	"user_email" text,
	"message" text,
	"project_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"url" text,
	"user_id" varchar
);
