import { useSelector, useDispatch } from "react-redux";

import { toggleTheme } from "../store/theme"; // import your themeSlice
import { downloadCSV } from "../store/expenses";

const PremiumNav = ({ onLogoutClick }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode); // access theme from Redux store

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // dispatch toggleTheme action
  };
  const handleDownload = () => {
    dispatch(downloadCSV());
  };

  return (
    <nav
      className={`top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg ${
        darkMode ? "bg-blueGray-800" : "bg-white"
      }`}
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="bg-green-200 h-8 w-32 mb-4 md:mb-0 rounded-md flex items-center justify-center">
          <div className="flex items-center">
            <div className="h-1 w-1 rounded-full bg-green-500 mr-1" />
            <span className="text-xs text-green-500 font-normal">Premium</span>
          </div>
        </div>
        <div
          className="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none hidden bg-blueGray-800"
          id="example-collapse-navbar"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
            <li className="flex items-center">
              <button
                className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                onClick={handleDownload}
              >
                <i className="fas fa-arrow-alt-circle-down"></i> Download
              </button>
            </li>
            <li className="flex items-center ml-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onClick={handleToggleTheme}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  change Theme
                </span>
              </label>
            </li>
            <li className="flex items-center ml-3">
              {/* Logout Button */}
              <button
                className="text-blueGray-300 hover:text-white cursor-pointer"
                onClick={onLogoutClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNav;
