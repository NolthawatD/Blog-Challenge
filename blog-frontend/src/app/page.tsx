"use client";

import { useState } from "react";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <div className="my-6">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 bg-custom-page-bg text-sm text-gray-700 border border-gray-300 rounded-lg"
              placeholder="Search"
              required
            />
          </div>

          {/* Dropdown */}
          <div className="relative hidden md:block">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Dropdown button{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`absolute top-full mt-2 ${
                dropdownOpen ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-20`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Create */}
          <button
            type="submit"
            className="text-white bg-custom-success focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 hidden md:block"
          >
            Create +
          </button>
        </div>
      </div>

      {/* content */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="container mx-auto">
          <div className="flex flex-row flex-wrap py-4">
            <aside className="w-full px-2">
              <div className="sticky top-0 p-4 w-full bg-gray-100 rounded-lg">
                <ul className="flex flex-col overflow-hidden rounded-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur inventore illum recusandae et cupiditate eaque
                  saepe provident repellendus sed voluptatum. Obcaecati cumque
                  porro quia! Architecto iusto est ea aliquid cumque?
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
