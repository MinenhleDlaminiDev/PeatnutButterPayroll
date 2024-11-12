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

    // State for form validation errors
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
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

    // Validate first name (only alphabets allowed)
    const validateFirstName = (name) => {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name) ? "" : "First name can only contain letters.";
    };
    
        // Validate last name (only alphabets allowed)
    const validateLastName = (name) => {
        const regex = /^[a-zA-Z]+$/;
        return regex.test(name) ? "" : "Last name can only contain letters.";
    };

    // handle change for first name
    const handleFirstNameChange = (e) =>{
        const value = e.target.value;
        setFirstName(value);

        // Validate and set error for first name
        setErrors((prevErrors) => ({
            ...prevErrors,
            firstName: validateFirstName(value),
        }));
    }

    // handle change for last name
    const handleLastNameChange = (e) =>{
        const value = e.target.value;
        setLastName(value);

        // Validate and set error for last name
        setErrors((prevErrors) => ({
            ...prevErrors,
            lastName: validateLastName(value),
        }));
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

          // Auto populate the fullname 
          setFullName(`${selectedEmployee.firstName} ${selectedEmployee.lastName}`);
        }
      }, [selectedEmployee]);

      // Use effect to update the state value of which radio button is switched immediately
      useEffect(() => {
        if (employee.gender) {
            setSelectedGender(employee.gender);
            if (employee.gender === "male") {
                setSelectedValue("Mr.");
            } else if (employee.gender === "female") {
                if (employee.salutation === "Ms." || employee.salutation === "Mrs.") {
                    setSelectedValue(employee.salutation);
                }
            } else if (employee.gender === "unspecified") {
                setSelectedValue("Mx.");
            }
        }
    }, [employee.gender, employee.salutation]); 

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
            alert("Employee has been added/changed")
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
        
         // Reset the states to their initial values
        setEmployee({
            employeeID: "",
            firstName: "",
            lastName: "",
            salutation: "",
            gender: "",
            profileColor: "",
            grossSalary: "",
        });

        // Reset the FullName state
        setFullName("");

        // Reset the selected gender
        setSelectedGender("");

        // Reset the selected salutation
        setSelectedValue("");

        // Reset the default checkbox
        setDefaultCheckbox(true);

        // Reset the gross salary state
        setGross("");
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

        if (selectedValue === "Mr.") {
            setSelectedGender("male");
            setEmployee((prev) => ({ ...prev, gender: "male" }));
        } else if (selectedValue === "Ms." || selectedValue === "Mrs.") {
            setSelectedGender("female");
            setEmployee((prev) => ({ ...prev, gender: "female" }));
        } else if (selectedValue === "Mx.") {
            setSelectedGender("unspecified");
            setEmployee((prev) => ({ ...prev, gender: "unspecified" }));
        }
    },[selectedValue])
    
    // // Handle the Alphabetical only inputs
    // const handleAlphabeticalOnly = (e) =>{
    //    const hasNumbers = /\d/;

    //    if(hasNumbers.test(e.target.value)){
    //     alert('only alphabets in First name and Last name fields');
    //    }
    // }



    

    return ( 
        <div className="form">
            <h4>Employee Information</h4>
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="topblock">
                    <button onClick={handleCancel}>Cancel</button>
                    <input type="submit" style={{backgroundColor:`${employee.profileColor}`}} value="Save" disabled={errors.firstName || errors.lastName} />
                </div>
                <div className="main">
                    <div className="leftSide">
                        <div className="content">
                            <label htmlFor="firstName">First Name(s) *</label>
                            <input type="text" name="firstName" value={employee.firstName} onChange={(e) => {handleChange(e); handleFirstNameChange(e);}} required/>
                            
                        </div>
                        {errors.firstName && <div className="error">{errors.firstName}</div>}
                        <div className="content">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" name="lastName" value={employee.lastName} onChange={(e) => {handleChange(e); handleLastNameChange(e);}} required/>
                        </div>
                        {errors.lastName && <div className="error">{errors.lastName}</div>}
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