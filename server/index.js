// Imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { mysql } from "./db.js";
import { Employee } from "./Employee.js";

// Initialse express, cors and body-parser
const app = express();
app.use(cors());
app.use(bodyParser.json());

// End Point to get all employees with CATCH for errors
app.get("/employees", async (req, res) => {
    try{
        const result = await sql.query(`SELECT * FROM Employees`);
        res.json(result.recordset);
    } catch (err){
        res.status(500).send((err).message);
    }
})

// End Point to add/update an employee
app.post("/employee", async (req, res) => {
    const { EmployeeID, FirstName, LastName, Salutation, Gender, ProfileColor,  GrossSalary } = req.body;
    try{
        const request = new sql.Request();

        // if EMPLOYEEID value is true UPDATE if False insert into 
        const query = EmployeeID
            ? `UPDATE Employees SET FirstName=@FirstName, LastName=@LastName, Salutation=@Salutation, Gender=@Gender, ProfileColor=@ProfileColor, GrossSalary=@GrossSalary WHERE EmployeeID=EmployeeID`
            :`INSERT INTO Employees (EmployeeID, FirstName, LastName, Salutation, Gender, ProfileColor, GrossSalary) VALUES (@EmployeeID, @FirstName, @LastName, @Salutation, @Gender, @ProfileColor, @GrossSalary )`;
        
        await sql.query(query);

        // Sending the success code
        res.sendStatus(200);
    } catch (err) {
        // error code
        res.status(500).send((err as Error).message);
    }
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
