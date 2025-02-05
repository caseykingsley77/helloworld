import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

export default function Login() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const url = baseUrl + "api/token/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : "/customers"
        );
      });
  }
  return (
    <form className="m-2 w-full max-w-sm" id="customer" onSubmit={login}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label for="name">username</label>
        </div>
        <div className="md:w-1/3">
          <input
            id="username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label for="password">Password</label>
        </div>
        <div className="md:w-1/3">
          <input
            id="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <button className="bg-purple-600 px-4 py-1 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
        Login
      </button>
    </form>
  );
}
