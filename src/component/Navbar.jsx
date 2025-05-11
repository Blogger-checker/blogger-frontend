import React from 'react'
import { Link } from 'react-router-dom'

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
            <Link to="/" className="btn btn-primary me-2">Submit Blog</Link>
            <Link to="/dashboard" className="btn btn-outline-secondary">My Dashboard</Link>
        </div>
      </nav>
    </>
  )
}
