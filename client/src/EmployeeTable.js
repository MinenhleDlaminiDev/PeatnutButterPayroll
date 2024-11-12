import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTable = ({ onSelect }) => {
    // STATE TO STORE THE EMPLOYEES OBJECT
    const [employees, setEmployees] = useState([]);

    // State to store the selected row
    const [selected, setSelected] = useState(null);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:5000/employees');
        setEmployees(response.data)
    }

    // USE EFFECT TO FETCH THE EMPLOYEES
    useEffect(() => {
        fetchEmployees();
    }, [])

    // handle Row Click
    const handleRowClick = (index) => {
        // Toggle selection (clicking again deselects the row)
        setSelected(selected === index ? null : index);
      };

    // Handle Add Employee button click to re-fetch employees
    const handleAddEmployeeClick = () => {
        fetchEmployees();
    };

    return ( 
        <div className="table">
            <div className="top">
                <h4>Current Employees</h4>
                <button onClick={handleAddEmployeeClick}>Add Employee</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Employee #</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Salutation</th>
                        <th>Profile Color</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp, index) =>(
                        <tr key={emp.employeeID} onClick={() => {onSelect(emp); handleRowClick(index)}} className={selected === index ? "selected" : ""}>
                            <td>{emp.employeeID}</td>
                            <td>{emp.firstName}</td>
                            <td>{emp.lastName}</td>
                            <td>{emp.salutation}</td>
                            <td>{emp.profileColor}</td>
                        </tr>
                    ))}
                       <tr className="empty-row">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                </tbody>
            </table>
        </div>
     );
}
 
export default EmployeeTable;