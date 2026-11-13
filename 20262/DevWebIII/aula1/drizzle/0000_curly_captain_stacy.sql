CREATE TABLE "cars" (
	"id_car" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"plate" char(7) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cars" ADD CONSTRAINT "cars_id_user_users_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE no action ON UPDATE no action;