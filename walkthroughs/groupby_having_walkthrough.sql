SELECT students.name as student, count(assignment_submissions.*) as total_submissions 
FROM assignment_submissions 
JOIN students ON students.id = student_id 
HAVING students.end_date IS NULL 
AND count(assignment_submissions.*) < 100
GROUP BY students.name