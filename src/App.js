import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/definition" element={<Definition />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}
export default App;
