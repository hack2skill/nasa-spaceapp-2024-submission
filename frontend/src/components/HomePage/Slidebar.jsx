import React from 'react';
import { NavLink } from 'react-router-dom';

const Slidebar = () => {
  return (
    <div>
      <div className="w-64 h-[620px] bg-teal-200 p-5">
        <nav>
          <ul className="space-y-4 flex flex-col gap-4 mt-[10px]">
            <li>
              <NavLink
                to="/"
                className="bg-white flex items-center justify-center h-10 rounded-md transition duration-200 hover:bg-teal-600 hover:text-white cursor-pointer"
              >
                <span className="text-lg">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data-analysis"
                className="bg-white flex items-center justify-center h-10 rounded-md transition duration-200 hover:bg-teal-600 hover:text-white cursor-pointer"
              >
                <span className="text-lg">Data Analysis</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signal-analysis"
                className="bg-white flex items-center justify-center h-10 rounded-md transition duration-200 hover:bg-teal-600 hover:text-white cursor-pointer"
              >
                <span className="text-lg">Signal Analysis</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logs-history"
                className="bg-white flex items-center justify-center h-10 rounded-md transition duration-200 hover:bg-teal-600 hover:text-white cursor-pointer"
              >
                <span className="text-lg">Logs and History</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Slidebar;
