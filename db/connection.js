const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'Showtime26',
  database: 'company'
},
console.log ('connected to the database')
);

module.exports = db;