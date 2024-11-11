// Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  pool  from "./db.js";

// Initialse express, cors and body-parser
const app = express();
app.use(cors());
app.use(bodyParser.json());

// End Point to get all employees with CATCH for errors
app.get("/employees", async (req, res) => {
    try{
        const [rows] = await pool.promise().query(`SELECT * FROM employees`);
        res.json(rows);
    } catch (err){
        res.status(500).send((err).message);
    }
})

// End Point to add/update an employee
app.post("/employee", async (req, res) => {
    const { employeeID, firstName, lastName, salutation, gender, profileColor,  grossSalary, added } = req.body;
    try{
        // if EMPLOYEEID value is true UPDATE if False insert into 
        let query;
        if(added){
            // Updated existing employees
            query = `UPDATE employees SET firstName=?, lastName=?, salutation=?, gender=?, profileColor=?, grossSalary=? WHERE employeeID=?`;
            await pool.promise().query(query, [firstName, lastName, salutation, gender, profileColor, grossSalary, employeeID, added]);
        } else{
            // Insert new employees
            query = `INSERT INTO employees (employeeID, firstName, lastName, salutation, gender, profileColor, grossSalary, added) VALUES (?, ?, ?, ?, ?, ?, ?, 1 )`;
            await pool.promise().query(query, [employeeID, firstName, lastName, salutation, gender, profileColor, grossSalary, added]);
        }
             
        // Sending the success code
        res.sendStatus(200);
    } catch (err) {
        // Sending Error response
        res.status(500).send((err).message);
    }
})

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
