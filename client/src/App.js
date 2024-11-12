import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setSelectedEmployee(null); 
  };

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Handle employee selection from the table
  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };


  return (
    <div className="App">
      <EmployeeTable onSelect={handleSelectEmployee}/>
      <EmployeeForm selectedEmployee={selectedEmployee} onSave={handleSave}/>
    </div>
  );
}

export default App;
