CREATE TYPE "public"."billing_type" AS ENUM('PRIVATE', 'SUBSIDIZED');--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DEFAULT 'in_progress'::text;--> statement-breakpoint
DROP TYPE "public"."session_status";--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('in_progress', 'completed');--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DEFAULT 'in_progress'::"public"."session_status";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "status" SET DATA TYPE "public"."session_status" USING "status"::"public"."session_status";--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "start_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "duration_in_minutes" integer DEFAULT 60 NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "billing_type" "billing_type" DEFAULT 'PRIVATE' NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "scheduled_at";