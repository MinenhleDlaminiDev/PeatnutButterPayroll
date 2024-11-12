import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTable = ({ onSelect }) => {
    const [employees, setEmployees] = useState([]);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data)
    }

    useEffect(() => {
        fetchEmployees();
    }, [])
    console.log(employees)
    return ( 
        <div className="">
            <h4>Current Employees</h4>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salutation</th>
                        <th>Profile Color</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp =>(
                        <tr key={emp.employeeID} onClick={() => onSelect(emp)}>
                            <td>{emp.employeeID}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.salutation}</td>
                            <td>{emp.profileColor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default EmployeeTable;