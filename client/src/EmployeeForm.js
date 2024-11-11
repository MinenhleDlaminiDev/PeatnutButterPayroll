// Imports
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const EmployeeForm = () => {
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
    const [selectedValue, setSelectedValue] = useState("");

    // state Alphabetical only
    const [aplhabeticalOnly, setAlphabeticalOnly] = useState("");



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

    // handle changes to the inputs
    const handleChange = (e) =>{
        setEmployee({...employee, [e.target.name]: e.target.value});
    }

    // handle the submitting the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/employee", employee);
        //onSave();
    }

    // Clearing the form
    const formref = useRef();

    // Handle cancel button click
    const handleCancel = () => {
        formref.current.reset();
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
    }

    // Handle the change event of selected value
    const handleSelectedValue = (e) => {
        setSelectedValue(e.target.value)
    }
    
    // Handle the Alphabetical only inputs
    const handleAlphabeticalOnly = (e) =>{
        const input = e.target.value;

        const alphabetRegex = /^[A-Za-z\s]*$/;

        if (alphabetRegex.test(input)) {
            setAlphabeticalOnly(input);
          }
    }
    
    return ( 
        <div className="">
            <form onSubmit={handleSubmit} ref={formref}>
                <div className="topblock">
                    <button onClick={handleCancel}>Cancel</button>
                    <button style={{backgroundColor:`${employee.profileColor}`}}>Save</button>
                </div>
                <div className="leftSide">
                    <div>
                        <label htmlFor="firstName">First Name(s) *</label>
                        <input type="text" name="firstName" value={aplhabeticalOnly} onChange={(e) => {handleChange(e); handleFirstNameChange(e); handleAlphabeticalOnly(e);}}/>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name *</label>
                        <input type="text" name="lastName" onChange={(e) => {handleChange(e); handleLastNameChange(e); handleAlphabeticalOnly(e);}}/>
                    </div>
                    <div>
                        <label htmlFor="salutation">Salutation *</label>
                        <select name="salutation" value={selectedValue} onChange={(e) => {handleChange(e); handleSelectedValue(e)}}>
                            <option value="Dr.">Dr.</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Mrs.">Mrs.</option>
                            <option value="Mx.">Mx.</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gender">Gender *</label>
                        <label htmlFor="male">
                            <input type="radio" name="gender" id="male" checked={selectedValue === "Mr."} onChange={handleChange}/>
                            Male
                        </label>
                        <label htmlFor="female">
                            <input type="radio" name="gender" id="female" checked={selectedValue === "Ms." || selectedValue === "Mrs."} onChange={handleChange}/>
                            Female
                        </label>
                        <label htmlFor="unspecified">
                            <input type="radio" name="gender" id="unspecified" checked={selectedValue === "Mx." } onChange={handleChange}/>
                            Unspecified
                        </label>
                    </div>
                    <div>
                        <label htmlFor="employeeid">Employee # *</label>
                        <input type="number" name="employeeid" onChange={handleChange}/>
                    </div>
                </div>
                <div className="rightSide">
                    <div>
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" name="fullName" value={fullName} disabled/>
                    </div>
                    <div>
                            <label htmlFor="grossSalary">Gross Salary $PY</label>
                            <input type="text" name="grossSalary" value={gross} onChange={(e) => {handleChange(e); handleFormat(e)}}/>
                    </div>
                    <div>
                            <label htmlFor="profileColor">Employee Profile Color</label>
                            <input type="checkbox" name="profileColor" value="Green" onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Green
                            <input type="checkbox" name="profileColor" value="Blue" onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Blue
                            <input type="checkbox" name="profileColor" value="Red" onChange={(e) => {handleChange(e); setDefaultCheckbox(false)}}/> Red
                            <input type="checkbox" name="profileColor" value="" checked={defaultCheckbox} onChange={(e) => {handleChange(e); setDefaultCheckbox(!defaultCheckbox)}}/> Default
                    </div>
                </div>

            </form>
        </div>
     );
}
 
export default EmployeeForm;