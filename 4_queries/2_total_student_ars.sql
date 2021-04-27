SELECT COUNT(assistance_requests.id) AS total_assistances, name
FROM students
JOIN assistance_requests ON assistance_requests.student_id=students.id
WHERE name = 'Elliot Dickinson'
GROUP BY name;