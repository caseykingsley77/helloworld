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

  useEffect(() => {
    // console.log("customer", customer);
    // console.log("tempCustomer", tempCustomer);
    // console.log(changed);
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
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
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
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        console.log(data);
        setChanged(false);
      })
      .catch();
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
        </div>
      ) : null}

      <button
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
              navigate("/customers");
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br />
      <Link to={"/customers"}>Go back</Link>
    </>
  );
}
