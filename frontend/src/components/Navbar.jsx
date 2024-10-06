import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-full bg-blue-800 p-5 flex gap-[200px] text-white justify-normal items-center">
      <h2 className="text-2xl font-bold mx-10">SeismoTrack</h2>
      <nav>
        <ul className="p-4 flex items-center gap-20 justify-center">
          <li>
            <NavLink 
              to="/" 
              className="text-lg hover:text-teal-600" 
              activeClassName="text-teal-600"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/data-analysis" 
              className="text-lg hover:text-teal-600" 
              activeClassName="text-teal-600"
            >
              Data Analysis
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/signal-analysis" 
              className="text-lg hover:text-teal-600" 
              activeClassName="text-teal-600"
            >
              Signal Analysis
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/logs-history" 
              className="text-lg hover:text-teal-600" 
              activeClassName="text-teal-600"
            >
              Logs and History
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
