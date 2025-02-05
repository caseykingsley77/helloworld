import "./index.css";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);
  function changedLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }
  return (
    <LoginContext.Provider value={[loggedIn, changedLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Employees />} />
            <Route path="/dictionary/" element={<Dictionary />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}
export default App;
