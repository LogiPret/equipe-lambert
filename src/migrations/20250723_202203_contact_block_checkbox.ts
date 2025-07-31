import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_primary_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_services_services_icon" AS ENUM('home', 'building');
  CREATE TYPE "public"."enum_pages_blocks_team_advantages_items_icon" AS ENUM('handshake', 'target', 'shield');
  CREATE TYPE "public"."enum_pages_blocks_properties_properties_type" AS ENUM('maison', 'condo', 'townhouse', 'loft');
  CREATE TYPE "public"."enum_pages_blocks_properties_properties_status" AS ENUM('a_vendre', 'vendu', 'option_achat');
  CREATE TYPE "public"."enum_pages_blocks_properties_show_all_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_background_color" AS ENUM('gradient_blue', 'dark_blue', 'navy');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_button_icon" AS ENUM('dollar_sign', 'key', 'phone', 'mail');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_cta_banner_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_contact_contact_info_icon" AS ENUM('phone', 'mail', 'location');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_form_fields_field_type" AS ENUM('text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox');
  CREATE TYPE "public"."enum_pages_blocks_contact_form_form_fields_width" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum_pages_blocks_map_section_block_properties_status" AS ENUM('À vendre', 'Vendu');
  CREATE TYPE "public"."enum_pages_blocks_map_section_block_properties_type" AS ENUM('Maison', 'Condo', 'Duplex', 'Triplex', 'Commercial');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_services_services_icon" AS ENUM('home', 'building');
  CREATE TYPE "public"."enum__pages_v_blocks_team_advantages_items_icon" AS ENUM('handshake', 'target', 'shield');
  CREATE TYPE "public"."enum__pages_v_blocks_properties_properties_type" AS ENUM('maison', 'condo', 'townhouse', 'loft');
  CREATE TYPE "public"."enum__pages_v_blocks_properties_properties_status" AS ENUM('a_vendre', 'vendu', 'option_achat');
  CREATE TYPE "public"."enum__pages_v_blocks_properties_show_all_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_background_color" AS ENUM('gradient_blue', 'dark_blue', 'navy');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_button_icon" AS ENUM('dollar_sign', 'key', 'phone', 'mail');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_banner_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_contact_info_icon" AS ENUM('phone', 'mail', 'location');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_form_fields_field_type" AS ENUM('text', 'email', 'tel', 'number', 'textarea', 'select', 'checkbox');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_form_fields_width" AS ENUM('full', 'half');
  CREATE TYPE "public"."enum__pages_v_blocks_map_section_block_properties_status" AS ENUM('À vendre', 'Vendu');
  CREATE TYPE "public"."enum__pages_v_blocks_map_section_block_properties_type" AS ENUM('Maison', 'Condo', 'Duplex', 'Triplex', 'Commercial');
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"badge_icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_icon" varchar,
  	"primary_button_link_type" "enum_pages_blocks_hero_primary_button_link_type" DEFAULT 'reference',
  	"primary_button_link_new_tab" boolean,
  	"primary_button_link_url" varchar,
  	"primary_button_link_appearance" "enum_pages_blocks_hero_primary_button_link_appearance" DEFAULT 'default',
  	"secondary_button_text" varchar,
  	"secondary_button_link_type" "enum_pages_blocks_hero_secondary_button_link_type" DEFAULT 'reference',
  	"secondary_button_link_new_tab" boolean,
  	"secondary_button_link_url" varchar,
  	"secondary_button_link_appearance" "enum_pages_blocks_hero_secondary_button_link_appearance" DEFAULT 'default',
  	"hero_image_id" integer,
  	"background_image_id" integer,
  	"stats_box_number" varchar,
  	"stats_box_text" varchar,
  	"stats_box_description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_services_services_icon",
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"speciality" varchar,
  	"image_id" integer,
  	"experience" varchar
  );
  
  CREATE TABLE "pages_blocks_team_advantages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_team_advantages_items_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"advantages_title" varchar,
  	"advantages_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_properties_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"price" varchar,
  	"address" varchar,
  	"beds" numeric,
  	"baths" numeric,
  	"sqft" varchar,
  	"type" "enum_pages_blocks_properties_properties_type",
  	"status" "enum_pages_blocks_properties_properties_status"
  );
  
  CREATE TABLE "pages_blocks_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"show_all_button_link_type" "enum_pages_blocks_properties_show_all_button_link_type" DEFAULT 'reference',
  	"show_all_button_link_new_tab" boolean,
  	"show_all_button_link_url" varchar,
  	"show_all_button_link_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"location" varchar,
  	"rating" numeric DEFAULT 5,
  	"image_id" integer,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rating" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_cta_banner_background_color" DEFAULT 'gradient_blue',
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_icon" "enum_pages_blocks_cta_banner_button_icon",
  	"button_variant" "enum_pages_blocks_cta_banner_button_variant" DEFAULT 'primary',
  	"button_link_type" "enum_pages_blocks_cta_banner_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"button_link_appearance" "enum_pages_blocks_cta_banner_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_contact_info_icon",
  	"title" varchar,
  	"primary" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_type" "enum_pages_blocks_contact_form_form_fields_field_type",
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"width" "enum_pages_blocks_contact_form_form_fields_width" DEFAULT 'full',
  	"rows" numeric DEFAULT 4
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"office_image_image_id" integer,
  	"office_image_description" varchar,
  	"form_title" varchar,
  	"form_submit_button_text" varchar DEFAULT 'Envoyer le message',
  	"form_submit_button_loading_text" varchar DEFAULT 'Envoi en cours...',
  	"form_checkbox_text" varchar DEFAULT 'I agree to the terms and conditions',
  	"form_disclaimer" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_title" varchar,
  	"logo_subtitle" varchar,
  	"contact_button_text" varchar,
  	"contact_button_phone" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "pages_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_title" varchar,
  	"logo_subtitle" varchar,
  	"logo_description" varchar,
  	"contact_phone" varchar,
  	"contact_phone_description" varchar,
  	"contact_email" varchar,
  	"contact_email_description" varchar,
  	"contact_address" varchar,
  	"contact_address_line2" varchar,
  	"contact_address_description" varchar,
  	"copyright" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_map_section_block_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" numeric PRIMARY KEY NOT NULL,
  	"address" varchar,
  	"price" varchar,
  	"status" "enum_pages_blocks_map_section_block_properties_status",
  	"type" "enum_pages_blocks_map_section_block_properties_type"
  );
  
  CREATE TABLE "pages_blocks_map_section_block_service_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"status" varchar,
  	"badge_color" varchar,
  	"bg_color" varchar,
  	"border_color" varchar
  );
  
  CREATE TABLE "pages_blocks_map_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_text" varchar,
  	"badge_icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"primary_button_text" varchar,
  	"primary_button_icon" varchar,
  	"primary_button_link_type" "enum__pages_v_blocks_hero_primary_button_link_type" DEFAULT 'reference',
  	"primary_button_link_new_tab" boolean,
  	"primary_button_link_url" varchar,
  	"primary_button_link_appearance" "enum__pages_v_blocks_hero_primary_button_link_appearance" DEFAULT 'default',
  	"secondary_button_text" varchar,
  	"secondary_button_link_type" "enum__pages_v_blocks_hero_secondary_button_link_type" DEFAULT 'reference',
  	"secondary_button_link_new_tab" boolean,
  	"secondary_button_link_url" varchar,
  	"secondary_button_link_appearance" "enum__pages_v_blocks_hero_secondary_button_link_appearance" DEFAULT 'default',
  	"hero_image_id" integer,
  	"background_image_id" integer,
  	"stats_box_number" varchar,
  	"stats_box_text" varchar,
  	"stats_box_description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_services_services_icon",
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"speciality" varchar,
  	"image_id" integer,
  	"experience" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_advantages_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_team_advantages_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"advantages_title" varchar,
  	"advantages_subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_properties_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"price" varchar,
  	"address" varchar,
  	"beds" numeric,
  	"baths" numeric,
  	"sqft" varchar,
  	"type" "enum__pages_v_blocks_properties_properties_type",
  	"status" "enum__pages_v_blocks_properties_properties_status",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"show_all_button_link_type" "enum__pages_v_blocks_properties_show_all_button_link_type" DEFAULT 'reference',
  	"show_all_button_link_new_tab" boolean,
  	"show_all_button_link_url" varchar,
  	"show_all_button_link_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"location" varchar,
  	"rating" numeric DEFAULT 5,
  	"image_id" integer,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rating" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_cta_banner_background_color" DEFAULT 'gradient_blue',
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"button_icon" "enum__pages_v_blocks_cta_banner_button_icon",
  	"button_variant" "enum__pages_v_blocks_cta_banner_button_variant" DEFAULT 'primary',
  	"button_link_type" "enum__pages_v_blocks_cta_banner_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"button_link_appearance" "enum__pages_v_blocks_cta_banner_button_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_contact_info_icon",
  	"title" varchar,
  	"primary" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_form_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form_form_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"field_type" "enum__pages_v_blocks_contact_form_form_fields_field_type",
  	"name" varchar,
  	"label" varchar,
  	"placeholder" varchar,
  	"required" boolean DEFAULT false,
  	"width" "enum__pages_v_blocks_contact_form_form_fields_width" DEFAULT 'full',
  	"rows" numeric DEFAULT 4,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"office_image_image_id" integer,
  	"office_image_description" varchar,
  	"form_title" varchar,
  	"form_submit_button_text" varchar DEFAULT 'Envoyer le message',
  	"form_submit_button_loading_text" varchar DEFAULT 'Envoi en cours...',
  	"form_checkbox_text" varchar DEFAULT 'I agree to the terms and conditions',
  	"form_disclaimer" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_title" varchar,
  	"logo_subtitle" varchar,
  	"contact_button_text" varchar,
  	"contact_button_phone" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_sections_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_title" varchar,
  	"logo_subtitle" varchar,
  	"logo_description" varchar,
  	"contact_phone" varchar,
  	"contact_phone_description" varchar,
  	"contact_email" varchar,
  	"contact_email_description" varchar,
  	"contact_address" varchar,
  	"contact_address_line2" varchar,
  	"contact_address_description" varchar,
  	"copyright" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_section_block_properties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" numeric,
  	"address" varchar,
  	"price" varchar,
  	"status" "enum__pages_v_blocks_map_section_block_properties_status",
  	"type" "enum__pages_v_blocks_map_section_block_properties_type"
  );
  
  CREATE TABLE "_pages_v_blocks_map_section_block_service_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"status" varchar,
  	"badge_color" varchar,
  	"bg_color" varchar,
  	"border_color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_map_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services_features" ADD CONSTRAINT "pages_blocks_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_advantages_items" ADD CONSTRAINT "pages_blocks_team_advantages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_properties_properties" ADD CONSTRAINT "pages_blocks_properties_properties_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_properties_properties" ADD CONSTRAINT "pages_blocks_properties_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_properties" ADD CONSTRAINT "pages_blocks_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_stats" ADD CONSTRAINT "pages_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_banner" ADD CONSTRAINT "pages_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_contact_info" ADD CONSTRAINT "pages_blocks_contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_form_fields_options" ADD CONSTRAINT "pages_blocks_contact_form_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_form_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form_form_fields" ADD CONSTRAINT "pages_blocks_contact_form_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_office_image_image_id_media_id_fk" FOREIGN KEY ("office_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header_navigation" ADD CONSTRAINT "pages_blocks_header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_sections_links" ADD CONSTRAINT "pages_blocks_footer_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_sections" ADD CONSTRAINT "pages_blocks_footer_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer_legal_links" ADD CONSTRAINT "pages_blocks_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_footer" ADD CONSTRAINT "pages_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_section_block_properties" ADD CONSTRAINT "pages_blocks_map_section_block_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_section_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_section_block_service_areas" ADD CONSTRAINT "pages_blocks_map_section_block_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map_section_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_section_block" ADD CONSTRAINT "pages_blocks_map_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services_features" ADD CONSTRAINT "_pages_v_blocks_services_services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_advantages_items" ADD CONSTRAINT "_pages_v_blocks_team_advantages_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_properties_properties" ADD CONSTRAINT "_pages_v_blocks_properties_properties_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_properties_properties" ADD CONSTRAINT "_pages_v_blocks_properties_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_properties" ADD CONSTRAINT "_pages_v_blocks_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_stats" ADD CONSTRAINT "_pages_v_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_banner" ADD CONSTRAINT "_pages_v_blocks_cta_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_form_fields_options" ADD CONSTRAINT "_pages_v_blocks_contact_form_form_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_form_form_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form_form_fields" ADD CONSTRAINT "_pages_v_blocks_contact_form_form_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_office_image_image_id_media_id_fk" FOREIGN KEY ("office_image_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header_navigation" ADD CONSTRAINT "_pages_v_blocks_header_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_header" ADD CONSTRAINT "_pages_v_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_sections_links" ADD CONSTRAINT "_pages_v_blocks_footer_sections_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_sections" ADD CONSTRAINT "_pages_v_blocks_footer_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_legal_links" ADD CONSTRAINT "_pages_v_blocks_footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_section_block_properties" ADD CONSTRAINT "_pages_v_blocks_map_section_block_properties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_section_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_section_block_service_areas" ADD CONSTRAINT "_pages_v_blocks_map_section_block_service_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map_section_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_section_block" ADD CONSTRAINT "_pages_v_blocks_map_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_hero_image_idx" ON "pages_blocks_hero" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_hero_background_image_idx" ON "pages_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_services_features_order_idx" ON "pages_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_features_parent_id_idx" ON "pages_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_services_image_idx" ON "pages_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_image_idx" ON "pages_blocks_team_members" USING btree ("image_id");
  CREATE INDEX "pages_blocks_team_advantages_items_order_idx" ON "pages_blocks_team_advantages_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_advantages_items_parent_id_idx" ON "pages_blocks_team_advantages_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_properties_properties_order_idx" ON "pages_blocks_properties_properties" USING btree ("_order");
  CREATE INDEX "pages_blocks_properties_properties_parent_id_idx" ON "pages_blocks_properties_properties" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_properties_properties_image_idx" ON "pages_blocks_properties_properties" USING btree ("image_id");
  CREATE INDEX "pages_blocks_properties_order_idx" ON "pages_blocks_properties" USING btree ("_order");
  CREATE INDEX "pages_blocks_properties_parent_id_idx" ON "pages_blocks_properties" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_properties_path_idx" ON "pages_blocks_properties" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_image_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "pages_blocks_testimonials_stats_order_idx" ON "pages_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_stats_parent_id_idx" ON "pages_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_banner_order_idx" ON "pages_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_banner_parent_id_idx" ON "pages_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_banner_path_idx" ON "pages_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_contact_info_order_idx" ON "pages_blocks_contact_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_contact_info_parent_id_idx" ON "pages_blocks_contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_form_fields_options_order_idx" ON "pages_blocks_contact_form_form_fields_options" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_form_fields_options_parent_id_idx" ON "pages_blocks_contact_form_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_form_fields_order_idx" ON "pages_blocks_contact_form_form_fields" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_form_fields_parent_id_idx" ON "pages_blocks_contact_form_form_fields" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_office_image_office_image_image_idx" ON "pages_blocks_contact" USING btree ("office_image_image_id");
  CREATE INDEX "pages_blocks_header_navigation_order_idx" ON "pages_blocks_header_navigation" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_navigation_parent_id_idx" ON "pages_blocks_header_navigation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_header_order_idx" ON "pages_blocks_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_header_parent_id_idx" ON "pages_blocks_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_header_path_idx" ON "pages_blocks_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_footer_sections_links_order_idx" ON "pages_blocks_footer_sections_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_sections_links_parent_id_idx" ON "pages_blocks_footer_sections_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_sections_order_idx" ON "pages_blocks_footer_sections" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_sections_parent_id_idx" ON "pages_blocks_footer_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_legal_links_order_idx" ON "pages_blocks_footer_legal_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_legal_links_parent_id_idx" ON "pages_blocks_footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_order_idx" ON "pages_blocks_footer" USING btree ("_order");
  CREATE INDEX "pages_blocks_footer_parent_id_idx" ON "pages_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_footer_path_idx" ON "pages_blocks_footer" USING btree ("_path");
  CREATE INDEX "pages_blocks_map_section_block_properties_order_idx" ON "pages_blocks_map_section_block_properties" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_section_block_properties_parent_id_idx" ON "pages_blocks_map_section_block_properties" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_section_block_service_areas_order_idx" ON "pages_blocks_map_section_block_service_areas" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_section_block_service_areas_parent_id_idx" ON "pages_blocks_map_section_block_service_areas" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_section_block_order_idx" ON "pages_blocks_map_section_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_section_block_parent_id_idx" ON "pages_blocks_map_section_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_section_block_path_idx" ON "pages_blocks_map_section_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_services_features_order_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_features_parent_id_idx" ON "_pages_v_blocks_services_services_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_order_idx" ON "_pages_v_blocks_services_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_services_parent_id_idx" ON "_pages_v_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_services_image_idx" ON "_pages_v_blocks_services_services" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_image_idx" ON "_pages_v_blocks_team_members" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_team_advantages_items_order_idx" ON "_pages_v_blocks_team_advantages_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_advantages_items_parent_id_idx" ON "_pages_v_blocks_team_advantages_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_properties_properties_order_idx" ON "_pages_v_blocks_properties_properties" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_properties_properties_parent_id_idx" ON "_pages_v_blocks_properties_properties" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_properties_properties_image_idx" ON "_pages_v_blocks_properties_properties" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_properties_order_idx" ON "_pages_v_blocks_properties" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_properties_parent_id_idx" ON "_pages_v_blocks_properties" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_properties_path_idx" ON "_pages_v_blocks_properties" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_order_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_testimonials_image_idx" ON "_pages_v_blocks_testimonials_testimonials" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_testimonials_stats_order_idx" ON "_pages_v_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_stats_parent_id_idx" ON "_pages_v_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_banner_order_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_banner_parent_id_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_banner_path_idx" ON "_pages_v_blocks_cta_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_order_idx" ON "_pages_v_blocks_contact_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_form_fields_options_order_idx" ON "_pages_v_blocks_contact_form_form_fields_options" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_form_fields_options_parent_id_idx" ON "_pages_v_blocks_contact_form_form_fields_options" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_form_fields_order_idx" ON "_pages_v_blocks_contact_form_form_fields" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_form_fields_parent_id_idx" ON "_pages_v_blocks_contact_form_form_fields" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_office_image_office_image_image_idx" ON "_pages_v_blocks_contact" USING btree ("office_image_image_id");
  CREATE INDEX "_pages_v_blocks_header_navigation_order_idx" ON "_pages_v_blocks_header_navigation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_navigation_parent_id_idx" ON "_pages_v_blocks_header_navigation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_header_order_idx" ON "_pages_v_blocks_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_header_parent_id_idx" ON "_pages_v_blocks_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_header_path_idx" ON "_pages_v_blocks_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_footer_sections_links_order_idx" ON "_pages_v_blocks_footer_sections_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_sections_links_parent_id_idx" ON "_pages_v_blocks_footer_sections_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_sections_order_idx" ON "_pages_v_blocks_footer_sections" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_sections_parent_id_idx" ON "_pages_v_blocks_footer_sections" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_legal_links_order_idx" ON "_pages_v_blocks_footer_legal_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_legal_links_parent_id_idx" ON "_pages_v_blocks_footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_order_idx" ON "_pages_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_parent_id_idx" ON "_pages_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_path_idx" ON "_pages_v_blocks_footer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_map_section_block_properties_order_idx" ON "_pages_v_blocks_map_section_block_properties" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_section_block_properties_parent_id_idx" ON "_pages_v_blocks_map_section_block_properties" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_section_block_service_areas_order_idx" ON "_pages_v_blocks_map_section_block_service_areas" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_section_block_service_areas_parent_id_idx" ON "_pages_v_blocks_map_section_block_service_areas" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_section_block_order_idx" ON "_pages_v_blocks_map_section_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_section_block_parent_id_idx" ON "_pages_v_blocks_map_section_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_section_block_path_idx" ON "_pages_v_blocks_map_section_block" USING btree ("_path");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_services_services_features" CASCADE;
  DROP TABLE "pages_blocks_services_services" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team_advantages_items" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_properties_properties" CASCADE;
  DROP TABLE "pages_blocks_properties" CASCADE;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_cta_banner" CASCADE;
  DROP TABLE "pages_blocks_contact_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact_form_form_fields_options" CASCADE;
  DROP TABLE "pages_blocks_contact_form_form_fields" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_header_navigation" CASCADE;
  DROP TABLE "pages_blocks_header" CASCADE;
  DROP TABLE "pages_blocks_footer_sections_links" CASCADE;
  DROP TABLE "pages_blocks_footer_sections" CASCADE;
  DROP TABLE "pages_blocks_footer_legal_links" CASCADE;
  DROP TABLE "pages_blocks_footer" CASCADE;
  DROP TABLE "pages_blocks_map_section_block_properties" CASCADE;
  DROP TABLE "pages_blocks_map_section_block_service_areas" CASCADE;
  DROP TABLE "pages_blocks_map_section_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_features" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_advantages_items" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_properties_properties" CASCADE;
  DROP TABLE "_pages_v_blocks_properties" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_form_fields_options" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form_form_fields" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_header_navigation" CASCADE;
  DROP TABLE "_pages_v_blocks_header" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_sections_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_sections" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_legal_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer" CASCADE;
  DROP TABLE "_pages_v_blocks_map_section_block_properties" CASCADE;
  DROP TABLE "_pages_v_blocks_map_section_block_service_areas" CASCADE;
  DROP TABLE "_pages_v_blocks_map_section_block" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_primary_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_services_services_icon";
  DROP TYPE "public"."enum_pages_blocks_team_advantages_items_icon";
  DROP TYPE "public"."enum_pages_blocks_properties_properties_type";
  DROP TYPE "public"."enum_pages_blocks_properties_properties_status";
  DROP TYPE "public"."enum_pages_blocks_properties_show_all_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_background_color";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_button_icon";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_button_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_banner_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_contact_contact_info_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_form_form_fields_field_type";
  DROP TYPE "public"."enum_pages_blocks_contact_form_form_fields_width";
  DROP TYPE "public"."enum_pages_blocks_map_section_block_properties_status";
  DROP TYPE "public"."enum_pages_blocks_map_section_block_properties_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_services_services_icon";
  DROP TYPE "public"."enum__pages_v_blocks_team_advantages_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_properties_properties_type";
  DROP TYPE "public"."enum__pages_v_blocks_properties_properties_status";
  DROP TYPE "public"."enum__pages_v_blocks_properties_show_all_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_button_icon";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_banner_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_contact_contact_info_icon";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_form_fields_field_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_form_fields_width";
  DROP TYPE "public"."enum__pages_v_blocks_map_section_block_properties_status";
  DROP TYPE "public"."enum__pages_v_blocks_map_section_block_properties_type";`)
}
