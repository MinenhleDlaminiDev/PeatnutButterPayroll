// Imports
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const EmployeeForm = ({ selectedEmployee, onSave }) => {
    //------------STATES---------------
    // state for employee
    const [employee, setEmployee] = useState({
        employeeID: "",
        firstName: "",
        lastName: "",
        salutation: "",
        gender: "",
        profileColor: "",
        grossSalary: "",
    });

    // state for fullname
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fullName, setFullName] = useState('');

    // State for Default checkbox
    const [defaultCheckbox, setDefaultCheckbox] = useState(true);

    // state for gross salary
    const [gross, setGross] = useState("");

    // state to store selected value
    const [selectedValue, setSelectedValue] = useState();

    // state of a checked Radio button
    const [selectedGender, setSelectedGender] = useState("");


    //------------FUNCTIONS-------------
    // handle change for first name
    const handleFirstNameChange = (e) =>{
        setFirstName(e.target.value);
    }

    // handle change for last name
    const handleLastNameChange = (e) =>{
        setLastName(e.target.value);
    }

    // Automatically update fullname
    useEffect(() =>{
        setFullName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    useEffect(() => {
        if (selectedEmployee) {
          setEmployee({
            employeeID: selectedEmployee.employeeID,
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            salutation: selectedEmployee.salutation,
            gender: selectedEmployee.gender,
            profileColor: selectedEmployee.profileColor,
            grossSalary: selectedEmployee.grossSalary,
            added:selectedEmployee.added
          });
        }
      }, [selectedEmployee]);

    // handle changes to the inputs
    const handleChange = (e) =>{
        setEmployee({...employee, [e.target.name]: e.target.value});
    }

    
    

    // handle the submitting the form
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(employee);
        try{
            const response = await axios.post('http://localhost:5000/employee', employee, {
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            console.log('Response:', response)
        } catch (error){
            console.error('Error:', error.response || error.message);
        }
        onSave();
    }
    
    // Clearing the form
    const formRef = useRef();

    // Handle cancel button click
    const handleCancel = (e) => {
        e.preventDefault();
        formRef.current.reset();
        employee.firstName = "SLeg";
    };

    // Handle the gross salary formatting
    const handleFormat = (e) => {
        // Get value
        let inputValue = e.target.value;
        // Remove all non-digit characters
        inputValue = inputValue.replace(/\D/g, '');
        // Insert a space after every 3 digits from the right
        inputValue = inputValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        //update the state with the formatted value
        setGross(inputValue);

        setEmployee({
            ...employee,
            grossSalary: inputValue,
        });
    }

    // Handle the change event of selected value
    const handleSelectedValue = (e) => {
        setSelectedValue(e.target.value)
    }
    // useEffect update select value when it is changed
    useEffect(() => {
        setSelectedValue(selectedValue);

        if(selectedValue === "Mr."){
            setSelectedGender("male");
        }else if (selectedValue === "Ms." || selectedValue === "Mrs."){
            setSelectedGender("female");
        }else if (selectedValue === "Mx."){
            setSelectedGender("unspecified")
        } 
    },[selectedValue])
    
    // Handle the Alphabetical only inputs
    const handleAlphabeticalOnly = (e) =>{
       const hasNumbers = /\d/;

       if(hasNumbers.test(e.target.value)){
        alert('only alphabets in First name and Last name fields');
       }
    }

    return ( 
        <div className="form">
            <h4>Employee Information</h4>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="topblock">
                    <button onClick={handleCancel}>Cancel</button>
                    <input type="submit" style={{backgroundColor:`${employee.profileColor}`}} value="Save"/>
                </div>
                <div className="main">
                    <div className="leftSide">
                        <div className="content">
                            <label htmlFor="firstName">First Name(s) *</label>
                            <input type="text" name="firstName" value={employee.firstName} onChange={(e) => {handleChange(e); handleFirstNameChange(e); handleAlphabeticalOnly(e);}} required/>
                        </div>
                        <div className="content">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" name="lastName" value={employee.lastName} onChange={(e) => {handleChange(e); handleLastNameChange(e); handleAlphabeticalOnly(e);}} required/>
                        </div>
                        <div className="content">
                            <label htmlFor="salutation">Salutation *</label>
                            <select name="salutation" value={employee.salutation} onChange={(e) => {handleChange(e); handleSelectedValue(e)}} required>
                                <option value="Dr.">Dr.</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Mx.">Mx.</option>
                            </select>
                        </div>
                        <div className="content">
                            <label htmlFor="gender" >Gender *</label>
                            <label htmlFor="male">
                                <input type="radio" name="gender" id="male" value={employee.gender} checked={selectedGender === 'male'} onChange={(e) => {handleChange(e); setSelectedGender("male")}}/>
                                Male
                            </label>
                            <label htmlFor="female">
                                <input type="radio" name="gender" id="female" value={selectedGender} checked={selectedGender === "female"} onChange={(e) => {handleChange(e); setSelectedGender("female")}}/>
                                Female
                            </label>
                            <label htmlFor="unspecified">
                                <input type="radio" name="gender" id="unspecified" value={selectedGender} checked={selectedGender === "unspecified"} onChange={(e) => {handleChange(e); setSelectedGender("unspecified")}}/>
                                Unspecified
                            </label>
                        </div>
                        <div className="content">
                            <label htmlFor="employeeID">Employee # *</label>
                            <input type="number" name="employeeID" value={employee.employeeID} onChange={handleChange} style={{textAlign: "right"}}/>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="content">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" value={fullName} disabled/>
                        </div>
                        <div className="content">
                                <label htmlFor="grossSalary">Gross Salary $PY</label>
                                <input type="text" name="grossSalary" value={employee.grossSalary === "" ? gross: employee.grossSalary} onChange={(e) => {handleFormat(e)}} style={{textAlign: "right"}}/>
                        </div>
                        <div className="content">
                                <label htmlFor="profileColor">Employee Profile Color</label>
                                <input type="checkbox" name="profileColor" value="Green" checked={employee.profileColor === "Green"} onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Green
                                <input type="checkbox" name="profileColor" value="Blue" checked={employee.profileColor === "Blue"} onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Blue
                                <input type="checkbox" name="profileColor" value="Red" checked={employee.profileColor === "Red"} onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Red
                                <input type="checkbox" name="profileColor" value="" checked={employee.profileColor === "" || !employee.profileColor} onChange={(e) => {handleChange(e); setDefaultCheckbox(!defaultCheckbox)}}/> Default
                        </div>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default EmployeeForm;