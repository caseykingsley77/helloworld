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
    if (customer.name !== tempCustomer.name) equal = false;
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

  function updateCustomer(e) {
    e.preventDefault();
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
    <div className="p-3">
      {notFound ? (
        <p>The customer with id {id} you are looking for was not found</p>
      ) : null}
      {customer ? (
        <div>
          {/* <p className="m-2 block px-2" type="text">
            {tempCustomer.id}
          </p> */}
          <form
            className="w-full max-w-sm"
            id="customer"
            onSubmit={updateCustomer}
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label for="name">Name</label>
              </div>
              <div className="md:w-1/3">
                <input
                  id="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-1/3">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true);
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
          {changed ? (
            <>
              <button
                className="bg-gray-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-gray-200 hover:text-white hover:bg-gray-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                form="customer"
              >
                Save
              </button>
            </>
          ) : null}

          <div>
            <button
              className="bg-red-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
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
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to={"/customers"}>
        <button className="no-underline bg-slate-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-slate-200 hover:text-white hover:bg-slate-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2">
          ← Go back
        </button>
      </Link>
    </div>
  );
}
