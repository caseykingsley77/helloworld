import { Link, useParams, useNavigate, IDLE_FETCHER } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;
    // console.log(customer, tempCustomer);
    let equal = true;
    if (customer.name != tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;
    if (equal) setChanged(false);
  });

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          //redirect to a 404 page (new URL)
          // navigate("/404");
          //render a 404 component in this page
          setNotFound(true);
        }
        if (!response.ok) {
          // console.log("response", response);
          throw new Error("Something went wrong, try again later!");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer() {
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        // console.log(response);
        if (!response.ok) throw new Error("something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        // console.log(data);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        // console.log("e", e);
        setError(e.message);
      });
  }

  return (
    <>
      {notFound ? (
        <p>The customer with id {id} you are looking for was not found</p>
      ) : null}
      {customer ? (
        <div>
          {/* <p className="m-2 block px-2" type="text">
            {tempCustomer.id}
          </p> */}
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, name: e.target.value });
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setChanged(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />
          {changed ? (
            <>
              <button
                className="m-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateCustomer}>Save</button>
            </>
          ) : null}

          <button
            className="m-2"
            onClick={(e) => {
              const url = baseUrl + "api/customers/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something went wrong");
                  }
                  setError(undefined);
                  navigate("/customers");
                })
                .catch((e) => {
                  // console.log(e);
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to={"/customers"}>Go back</Link>
    </>
  );
}
