// Imports
import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sql from "./db";
import { Employee } from "./Employee";

// Initialse express, cors and body-parser
const app = express();
app.use(cors());
app.use(bodyParser.json());

// End Point to get all employees with CATCH for errors
app.get("/employees", async (req: Request, res: Response) => {
    try{
        const result = await sql.query<Employee> (`SELECT * FROM Employees`);
        res.json(result.recordset);
    } catch (err){
        res.status(500).send((err as Error).message);
    }
})

// End Point to add/update an employee
app.post("/employee", async (req: Request, res: Response) => {
    const { EmployeeID, FirstName, LastName, Salutation, Gender, ProfileColor,  GrossSalary } = req.body as Employee;
    try{
        const request = new sql.Request();

        // Add parameters with specific types
        request.input("EmployeeID", sql.Int, EmployeeID);
        request.input("FirstName", sql.NVarChar, FirstName);
        request.input("LastName", sql.NVarChar, LastName);
        request.input("Salutation", sql.NVarChar, Salutation);
        request.input("Gender", sql.NVarChar, Gender);
        request.input("ProfileColor", sql.NVarChar, ProfileColor);
        request.input("GrossSalary", sql.Decimal, GrossSalary);

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
app.listen(PORT, () => console.log('Server running on port ${PORT}'));