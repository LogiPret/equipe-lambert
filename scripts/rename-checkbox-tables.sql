-- Alternative approach: Rename the problematic field temporarily
-- This allows the schema migration to succeed by avoiding the conflict

-- Step 1: Rename the existing checkbox options columns to backup names
-- ALTER TABLE pages_blocks_quiz_form_steps_fields_checkbox_options RENAME TO pages_blocks_quiz_form_steps_fields_checkbox_options_backup;
-- ALTER TABLE _pages_v_blocks_quiz_form_steps_fields_checkbox_options RENAME TO _pages_v_blocks_quiz_form_steps_fields_checkbox_options_backup;

-- Step 2: After this runs successfully and new tables are created, 
-- you can manually migrate the data from backup tables to new ones if needed

-- Step 3: Eventually drop the backup tables when you're confident everything works
-- DROP TABLE IF EXISTS pages_blocks_quiz_form_steps_fields_checkbox_options_backup;
-- DROP TABLE IF EXISTS _pages_v_blocks_quiz_form_steps_fields_checkbox_options_backup;
