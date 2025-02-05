import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  function toggleShow() {
    setShow(!show);
  }

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = baseUrl + "api/customers";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);
  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        console.log(data);
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <h1>Here are our Customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <Link
                key={customer.id}
                to={"/customers/" + customer.id}
                className="no-underline block m-4 px-4 py-1 text-sm text-white font-semibold bg-purple-600 border border-purple-200 hover:text-white hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 rounded"
              >
                <div className="m-2">
                  <button>{customer.name}</button>
                </div>
              </Link>
            );
          })
        : null}
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
