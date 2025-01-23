import './App.css';
import Employee from './components/Employee';

function App() {
  console.log('We are bout to show the employee');
  const showEmployees = false;
  return (
    <div className="App">
      {console.log('inside the return')}
      {showEmployees ? (
        <>
        <Employee/>
        <Employee/>
        <Employee/>
        <Employee/>
        <Employee/>
        <Employee/> 
        </>
      ): (
        <p> You Cannot see the Employees</p>
      )} 
    </div>
  );
}
export default App;