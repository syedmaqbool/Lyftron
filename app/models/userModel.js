const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '123',
  port: 5432,
})

/*
Get latest data from DB
*/
const getUsersData = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
      if (error) {
        console.log(error);
        reject (error)
      }
      resolve(results.rows);
    })
    });
}
/*
Insert Data into table
*/

const createUserData = (data) => {

const reutrnData = data.map((user=>{
  pool.query(`INSERT INTO users (first_name, last_name,email,avatar) VALUES  ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.avatar}') ON CONFLICT DO NOTHING;`);
}))
 return new Promise((resolve, reject) => {
  pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    resolve(results.rows);
	})
   
  });
}

module.exports = {
  getUsersData,
  createUserData,
 }