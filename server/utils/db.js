import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "DDB.123",
    database: "employee_databse"
});

con.connect(function(err) {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected");
    }
});

export default con;
