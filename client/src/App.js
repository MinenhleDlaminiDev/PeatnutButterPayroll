import './App.css';
import EmployeeForm from './EmployeeForm';
import EmployeeTable from './EmployeeTable';
import { useState } from 'react';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => setRefresh(!refresh);
  return (
    <div className="App">
      <EmployeeTable onSelect={() => {}}/>
      <EmployeeForm onSave={handleSave}/>
    </div>
  );
}

export default App;
