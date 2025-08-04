import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_blog_carousel_collection" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_choices_icon" AS ENUM('trendingUp', 'clock', 'shield', 'target', 'award', 'users');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_choices_icon_color" AS ENUM('text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-red-600', 'text-white');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_choices_bg_color" AS ENUM('bg-blue-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100', 'bg-red-100', 'bg-gray-100');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_choices_stat_color" AS ENUM('text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-red-600', 'text-gray-600');
  CREATE TYPE "public"."enum_pages_blocks_why_choose_us_choices_stat_bg_color" AS ENUM('bg-blue-50', 'bg-green-50', 'bg-orange-50', 'bg-purple-50', 'bg-red-50', 'bg-gray-50');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_blog_carousel_collection" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_icon" AS ENUM('trendingUp', 'clock', 'shield', 'target', 'award', 'users');
  CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_icon_color" AS ENUM('text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-red-600', 'text-white');
  CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_bg_color" AS ENUM('bg-blue-100', 'bg-green-100', 'bg-orange-100', 'bg-purple-100', 'bg-red-100', 'bg-gray-100');
  CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_stat_color" AS ENUM('text-blue-600', 'text-green-600', 'text-orange-600', 'text-purple-600', 'text-red-600', 'text-gray-600');
  CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_stat_bg_color" AS ENUM('bg-blue-50', 'bg-green-50', 'bg-orange-50', 'bg-purple-50', 'bg-red-50', 'bg-gray-50');
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum_pages_blocks_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_blog_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"collection" "enum_pages_blocks_blog_carousel_collection" DEFAULT 'posts',
  	"posts_limit" numeric DEFAULT 6,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vendre_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_vendre_hero_timeframe_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"option" varchar
  );
  
  CREATE TABLE "pages_blocks_vendre_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar DEFAULT 'VENDEZ VOTRE PROPRIÉTÉ',
  	"title" varchar DEFAULT 'Vendez votre propriété',
  	"subtitle" varchar DEFAULT 'rapidement et au meilleur prix',
  	"description" varchar DEFAULT 'Notre équipe d''experts vous accompagne dans la vente de votre bien immobilier avec une approche personnalisée et des résultats garantis.',
  	"primary_button_text" varchar DEFAULT 'Évaluation gratuite',
  	"secondary_button_text" varchar DEFAULT 'En savoir plus',
  	"form_title" varchar DEFAULT 'Obtenez une évaluation gratuite',
  	"form_fields_address_placeholder" varchar DEFAULT 'Adresse de votre propriété *',
  	"form_fields_first_name_placeholder" varchar DEFAULT 'Prénom *',
  	"form_fields_last_name_placeholder" varchar DEFAULT 'Nom de famille *',
  	"form_fields_phone_placeholder" varchar DEFAULT 'Téléphone *',
  	"form_fields_email_placeholder" varchar DEFAULT 'Email *',
  	"form_fields_timeframe_placeholder" varchar DEFAULT 'Délai souhaité pour la vente',
  	"form_fields_submit_button_text" varchar DEFAULT 'Obtenir mon évaluation gratuite',
  	"form_fields_disclaimer_text" varchar DEFAULT '* Évaluation professionnelle sans engagement',
  	"background_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_us_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_why_choose_us_choices_icon" DEFAULT 'trendingUp',
  	"icon_color" "enum_pages_blocks_why_choose_us_choices_icon_color" DEFAULT 'text-blue-600',
  	"bg_color" "enum_pages_blocks_why_choose_us_choices_bg_color" DEFAULT 'bg-blue-100',
  	"title" varchar,
  	"description" varchar,
  	"stat_value" varchar,
  	"stat_label" varchar,
  	"stat_color" "enum_pages_blocks_why_choose_us_choices_stat_color" DEFAULT 'text-blue-600',
  	"stat_bg_color" "enum_pages_blocks_why_choose_us_choices_stat_bg_color" DEFAULT 'bg-blue-50'
  );
  
  CREATE TABLE "pages_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Pourquoi nous choisir',
  	"subtitle" varchar DEFAULT 'Notre expertise et notre engagement envers l''excellence font de nous le partenaire idéal pour la vente de votre propriété.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link_type" "enum__pages_v_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_appearance" "enum__pages_v_blocks_button_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_blog_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"collection" "enum__pages_v_blocks_blog_carousel_collection" DEFAULT 'posts',
  	"posts_limit" numeric DEFAULT 6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vendre_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vendre_hero_timeframe_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"option" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vendre_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar DEFAULT 'VENDEZ VOTRE PROPRIÉTÉ',
  	"title" varchar DEFAULT 'Vendez votre propriété',
  	"subtitle" varchar DEFAULT 'rapidement et au meilleur prix',
  	"description" varchar DEFAULT 'Notre équipe d''experts vous accompagne dans la vente de votre bien immobilier avec une approche personnalisée et des résultats garantis.',
  	"primary_button_text" varchar DEFAULT 'Évaluation gratuite',
  	"secondary_button_text" varchar DEFAULT 'En savoir plus',
  	"form_title" varchar DEFAULT 'Obtenez une évaluation gratuite',
  	"form_fields_address_placeholder" varchar DEFAULT 'Adresse de votre propriété *',
  	"form_fields_first_name_placeholder" varchar DEFAULT 'Prénom *',
  	"form_fields_last_name_placeholder" varchar DEFAULT 'Nom de famille *',
  	"form_fields_phone_placeholder" varchar DEFAULT 'Téléphone *',
  	"form_fields_email_placeholder" varchar DEFAULT 'Email *',
  	"form_fields_timeframe_placeholder" varchar DEFAULT 'Délai souhaité pour la vente',
  	"form_fields_submit_button_text" varchar DEFAULT 'Obtenir mon évaluation gratuite',
  	"form_fields_disclaimer_text" varchar DEFAULT '* Évaluation professionnelle sans engagement',
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_us_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_why_choose_us_choices_icon" DEFAULT 'trendingUp',
  	"icon_color" "enum__pages_v_blocks_why_choose_us_choices_icon_color" DEFAULT 'text-blue-600',
  	"bg_color" "enum__pages_v_blocks_why_choose_us_choices_bg_color" DEFAULT 'bg-blue-100',
  	"title" varchar,
  	"description" varchar,
  	"stat_value" varchar,
  	"stat_label" varchar,
  	"stat_color" "enum__pages_v_blocks_why_choose_us_choices_stat_color" DEFAULT 'text-blue-600',
  	"stat_bg_color" "enum__pages_v_blocks_why_choose_us_choices_stat_bg_color" DEFAULT 'bg-blue-50',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Pourquoi nous choisir',
  	"subtitle" varchar DEFAULT 'Notre expertise et notre engagement envers l''excellence font de nous le partenaire idéal pour la vente de votre propriété.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_contact" ADD COLUMN "form_success_message" varchar DEFAULT 'Thank you for your message! We will get back to you soon.';
  ALTER TABLE "_pages_v_blocks_contact" ADD COLUMN "form_success_message" varchar DEFAULT 'Thank you for your message! We will get back to you soon.';
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_carousel" ADD CONSTRAINT "pages_blocks_blog_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vendre_hero_stats" ADD CONSTRAINT "pages_blocks_vendre_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vendre_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vendre_hero_timeframe_options" ADD CONSTRAINT "pages_blocks_vendre_hero_timeframe_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vendre_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vendre_hero" ADD CONSTRAINT "pages_blocks_vendre_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_vendre_hero" ADD CONSTRAINT "pages_blocks_vendre_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us_choices" ADD CONSTRAINT "pages_blocks_why_choose_us_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_carousel" ADD CONSTRAINT "_pages_v_blocks_blog_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vendre_hero_stats" ADD CONSTRAINT "_pages_v_blocks_vendre_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vendre_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vendre_hero_timeframe_options" ADD CONSTRAINT "_pages_v_blocks_vendre_hero_timeframe_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vendre_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vendre_hero" ADD CONSTRAINT "_pages_v_blocks_vendre_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vendre_hero" ADD CONSTRAINT "_pages_v_blocks_vendre_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_us_choices" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_us" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_blog_carousel_order_idx" ON "pages_blocks_blog_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_blog_carousel_parent_id_idx" ON "pages_blocks_blog_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_blog_carousel_path_idx" ON "pages_blocks_blog_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_vendre_hero_stats_order_idx" ON "pages_blocks_vendre_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_vendre_hero_stats_parent_id_idx" ON "pages_blocks_vendre_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vendre_hero_timeframe_options_order_idx" ON "pages_blocks_vendre_hero_timeframe_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_vendre_hero_timeframe_options_parent_id_idx" ON "pages_blocks_vendre_hero_timeframe_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vendre_hero_order_idx" ON "pages_blocks_vendre_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_vendre_hero_parent_id_idx" ON "pages_blocks_vendre_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vendre_hero_path_idx" ON "pages_blocks_vendre_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_vendre_hero_background_image_idx" ON "pages_blocks_vendre_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_why_choose_us_choices_order_idx" ON "pages_blocks_why_choose_us_choices" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_choices_parent_id_idx" ON "pages_blocks_why_choose_us_choices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_order_idx" ON "pages_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_parent_id_idx" ON "pages_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_path_idx" ON "pages_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_blog_carousel_order_idx" ON "_pages_v_blocks_blog_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_blog_carousel_parent_id_idx" ON "_pages_v_blocks_blog_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_blog_carousel_path_idx" ON "_pages_v_blocks_blog_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vendre_hero_stats_order_idx" ON "_pages_v_blocks_vendre_hero_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vendre_hero_stats_parent_id_idx" ON "_pages_v_blocks_vendre_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vendre_hero_timeframe_options_order_idx" ON "_pages_v_blocks_vendre_hero_timeframe_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vendre_hero_timeframe_options_parent_id_idx" ON "_pages_v_blocks_vendre_hero_timeframe_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vendre_hero_order_idx" ON "_pages_v_blocks_vendre_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vendre_hero_parent_id_idx" ON "_pages_v_blocks_vendre_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vendre_hero_path_idx" ON "_pages_v_blocks_vendre_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vendre_hero_background_image_idx" ON "_pages_v_blocks_vendre_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_why_choose_us_choices_order_idx" ON "_pages_v_blocks_why_choose_us_choices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_us_choices_parent_id_idx" ON "_pages_v_blocks_why_choose_us_choices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_us_order_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_us_parent_id_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_us_path_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_path");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "pages_blocks_blog_carousel" CASCADE;
  DROP TABLE "pages_blocks_vendre_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_vendre_hero_timeframe_options" CASCADE;
  DROP TABLE "pages_blocks_vendre_hero" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us_choices" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_vendre_hero_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_vendre_hero_timeframe_options" CASCADE;
  DROP TABLE "_pages_v_blocks_vendre_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_us_choices" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_us" CASCADE;
  ALTER TABLE "pages_blocks_contact" DROP COLUMN "form_success_message";
  ALTER TABLE "_pages_v_blocks_contact" DROP COLUMN "form_success_message";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_blog_carousel_collection";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_choices_icon";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_choices_icon_color";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_choices_bg_color";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_choices_stat_color";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_choices_stat_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_blog_carousel_collection";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_icon";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_icon_color";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_bg_color";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_stat_color";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_choices_stat_bg_color";`)
}
