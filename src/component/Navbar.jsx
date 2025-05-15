import { faBook, faEdit, faHome, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      {/* <nav className="d-flex justify-content-between bg-white align-items-center p-3 border-bottom">
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
      </nav> */}
      <header className="header bg-white py-3 shadow-sm">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo d-flex align-items-center">
              <h1 className="h5 mb-0 fw-bold text-primary">
                <img src={logo} width="120"/>
              </h1>
            </div>
            <div className="nav-links d-flex align-items-center">
              
                <FontAwesomeIcon icon={faEdit} className="me-1" />
                <NavLink  to="/"  className={({ isActive }) =>  isActive ? "text-primary me-3" : "text-secondary me-3"}>
                  Submit Blog
                </NavLink>
              
                <FontAwesomeIcon icon={faTachometerAlt} className="me-1" />
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary me-3" : "text-secondary me-3"}>
                          My Dashboard
                </NavLink>
              
                <FontAwesomeIcon icon={faBook} className="me-1" />
                <NavLink  to="/blog-list"  className={({ isActive }) =>  isActive ? "text-primary me-3" : "text-secondary me-3"}>
                        Browse Blogs
                </NavLink>
              
              <div className="ms-3 d-flex align-items-center">
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
