const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT teachers.name AS teacher,
        cohorts.name AS cohorts
  FROM teachers
  JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
  JOIN students ON students.id = assistance_requests.student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher;

`,[`%${process.argv[2]}%`])
  .then(res => {
    for (const row of res.rows) {
      console.log(`${row.cohorts}: ${row.teacher}`)
    }
  })
  .catch(error => console.error('Error:', error.stack));
