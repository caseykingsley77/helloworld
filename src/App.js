import './App.css';
import Employee from './components/Employee';
import {useState} from 'react';

function App() {
  const[role, setRole] = useState('dev');
  const showEmployees = true;
  return (
    <div className="App">
      {console.log('inside the return')}
      {showEmployees ? (
        <>
        <input type='text' onChange={(e) => {
          console.log(e.target.value);
          setRole(e.target.value);
        }}
        />
        <Employee name = "Casey" role="Intern"/>
        <Employee name = "James" role = {role}/> 
        <Employee name = "Jessica"/>
        </>
      ): (
        <p> You Cannot see the Employees</p>
      )} 
    </div>
  );
}
export default App;