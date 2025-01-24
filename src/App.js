import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [role, setRole] = useState("dev");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Sarah",
      role: "UI/UX Designer",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member1.jpg",
    },
    {
      id: 2,
      name: "Casey",
      role: "Software Engineer",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member2.jpg",
    },
    {
      id: 3,
      name: "Caleb",
      role: "Developer",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member3.jpg",
    },
    {
      id: 4,
      name: "Donken",
      role: "Business Man",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member4.jpg",
    },
    {
      id: 5,
      name: "Ogo",
      role: "Nail Tech",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member1.jpg",
    },
    {
      id: 6,
      name: "Favor",
      role: "Soft life",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member2.jpg",
    },
    {
      id: 7,
      name: "Josh",
      role: "Engineer",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member3.jpg",
    },
    {
      id: 8,
      name: "Adanna",
      role: "Teacher",
      img: "https://s3.tebi.io/digitrader/assets/images/team/member4.jpg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updateEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }

      return employee;
    });
    setEmployees(updateEmployees);
    console.log("updateEmployee inside of the app.js");
  }

  const showEmployees = true;
  return (
    <div className="App">
      {console.log("inside the return")}
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className="flex flex-wrap justify-center ">
            {employees.map((employee) => {
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p> You Cannot see the Employees</p>
      )}
    </div>
  );
}
export default App;
