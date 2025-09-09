-- Complete Quiz Form Database Cleanup Script
-- Run this in your Neon SQL console to completely remove all quiz-related tables

-- First, disable foreign key checks temporarily (if supported)
-- Note: PostgreSQL doesn't have a global disable, so we'll drop constraints first

-- Drop all quiz-related tables in the correct order (child tables first)

-- Drop versioned checkbox options table
DROP TABLE IF EXISTS "_pages_v_blocks_quiz_form_steps_fields_checkbox_options" CASCADE;

-- Drop main checkbox options table  
DROP TABLE IF EXISTS "pages_blocks_quiz_form_steps_fields_checkbox_options" CASCADE;

-- Drop versioned fields table
DROP TABLE IF EXISTS "_pages_v_blocks_quiz_form_steps_fields" CASCADE;

-- Drop main fields table
DROP TABLE IF EXISTS "pages_blocks_quiz_form_steps_fields" CASCADE;

-- Drop versioned steps table
DROP TABLE IF EXISTS "_pages_v_blocks_quiz_form_steps" CASCADE;

-- Drop main steps table
DROP TABLE IF EXISTS "pages_blocks_quiz_form_steps" CASCADE;

-- Drop versioned quiz form table
DROP TABLE IF EXISTS "_pages_v_blocks_quiz_form" CASCADE;

-- Drop main quiz form table
DROP TABLE IF EXISTS "pages_blocks_quiz_form" CASCADE;

-- Also check for any other quiz-related tables that might exist
-- You can run this query first to see all quiz tables:
-- SELECT tablename FROM pg_tables WHERE tablename LIKE '%quiz%';

-- Clean up any orphaned references in the main pages tables
-- Remove any quiz form blocks from pages_blocks table
DELETE FROM "pages_blocks" WHERE "blockType" = 'quizForm';

-- Remove any quiz form blocks from versioned pages_blocks table
DELETE FROM "_pages_v_blocks" WHERE "blockType" = 'quizForm';

-- Vacuum to clean up space
VACUUM;
