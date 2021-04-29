const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const maxResults = process.argv[3];
//need to be careful with alias names matching object in promises
pool.query(`
SELECT students.id AS id, students.name AS name, cohorts.name AS cohort_id
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${cohortName}%'
LIMIT ${maxResults || 5} ;
`)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
    })
  })
  .catch(err => console.error('query error', err.stack));