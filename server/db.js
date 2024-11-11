import mysql from "mysql2";

const pool = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: '1234',
    database: "payrollDB"
})

// Check if database connected or not 
pool.connect((err) => {
  if(err){
    console.log("Error connecting to Database")
  } else {
    console.log("Connection successful")
  }
})

export default pool;