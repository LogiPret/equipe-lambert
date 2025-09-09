-- Cleanup orphaned checkbox options records
-- Run this SQL directly in your database to fix the foreign key constraint issues

-- First, let's see what orphaned records exist
-- (You can run these SELECT statements first to see what will be deleted)

-- Check orphaned records in the main checkbox options table
SELECT COUNT(*) as orphaned_count 
FROM pages_blocks_quiz_form_steps_fields_checkbox_options co
WHERE co._parent_id NOT IN (
  SELECT id FROM pages_blocks_quiz_form_steps_fields WHERE id IS NOT NULL
);

-- Check orphaned records in the versioned checkbox options table
SELECT COUNT(*) as orphaned_version_count 
FROM _pages_v_blocks_quiz_form_steps_fields_checkbox_options co
WHERE co._parent_id NOT IN (
  SELECT id FROM _pages_v_blocks_quiz_form_steps_fields WHERE id IS NOT NULL
);

-- Now delete the orphaned records (UNCOMMENT THESE WHEN READY TO CLEAN)
-- Delete orphaned records from main table
-- DELETE FROM pages_blocks_quiz_form_steps_fields_checkbox_options
-- WHERE _parent_id NOT IN (
--   SELECT id FROM pages_blocks_quiz_form_steps_fields WHERE id IS NOT NULL
-- );

-- Delete orphaned records from versioned table  
-- DELETE FROM _pages_v_blocks_quiz_form_steps_fields_checkbox_options
-- WHERE _parent_id NOT IN (
--   SELECT id FROM _pages_v_blocks_quiz_form_steps_fields WHERE id IS NOT NULL
-- );

-- Alternative: If you want to be more specific, delete only records with parent_id 415
-- (the specific ID mentioned in the error)
-- DELETE FROM pages_blocks_quiz_form_steps_fields_checkbox_options WHERE _parent_id = 415;
-- DELETE FROM _pages_v_blocks_quiz_form_steps_fields_checkbox_options WHERE _parent_id = 415;
