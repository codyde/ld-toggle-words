CREATE TABLE IF NOT EXISTS "aquarium_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"phrase" text,
	"clue" text,
	"answer" text,
	"option1" text,
	"option2" text,
	"option3" text
);
