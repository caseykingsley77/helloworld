import { useContext, useEffect } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../App";

const navigation = [
  { name: "Employees", href: "/" },
  { name: "Customers", href: "/customers" },
  { name: "Dictionary", href: "/dictionary" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo and navigation */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 items-center">
                    {/* Add your logo here if needed */}
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium no-underline"
                            )
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                      {loggedIn ? (
                        <NavLink
                          to={"/login"}
                          onClick={() => {
                            console.log("logging out...");
                            setLoggedIn(false);
                            localStorage.clear();
                          }}
                          className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Logout
                        </NavLink>
                      ) : (
                        <NavLink
                          to={"login"}
                          className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          Login
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notification bell */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu items */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium no-underline"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                {loggedIn ? (
                  <NavLink
                    to={"/login"}
                    onClick={() => {
                      console.log("logging out...");
                      setLoggedIn(false);
                      localStorage.clear();
                    }}
                    className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </NavLink>
                ) : (
                  <NavLink
                    to={"login"}
                    className="block px-3 py-2 rounded-md text-base font-medium no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="bg-gray-300">
        <div className="max-w-7xl mx-auto min-h-screen px-3 py-2">
          {props.children}
        </div>
      </div>
      <footer className="text-white text-center mt-4">Example</footer>
    </>
  );
}
