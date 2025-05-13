import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      <nav className="d-flex justify-content-between bg-white align-items-center p-3 border-bottom">
        <div className="d-flex align-items-center">
            <img
            src="https://img.icons8.com/fluency/48/document.png" // icon similar to yours
            alt="BlogCheck Logo"
            width="30"
            height="30"
            className="me-2"
            />
            <h5 className="mb-0 fw-bold">BlogCheck</h5>
        </div>

        <div>
            <NavLink  to="/"  className={({ isActive }) =>  isActive ? "btn btn-primary me-2" : "btn btn-outline-primary me-2"}>
              Submit Blog
            </NavLink>
            <NavLink  to="/blog-list"  className={({ isActive }) =>  isActive ? "btn btn-primary me-2" : "btn btn-outline-primary me-2"}>
              Blog list
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "btn btn-primary" : "btn btn-outline-secondary"}>
              My Dashboard
            </NavLink>
        </div>
      </nav>
    </>
  )
}
