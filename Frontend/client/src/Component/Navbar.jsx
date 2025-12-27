import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleHome = () => navigate("/")
  const AddLeads = () => navigate("/leads")
  const About = () => navigate("/about")

  return (
    <div>
      <div className="navbar-container">
        {/* Logo / Brand */}
        <div className="navbar-brand" onClick={handleHome}>
          LMS
        </div>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        {/* Menu */}
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <li className="homeMenue" onClick={handleHome}>Home</li>
          <li>DashBoard</li>
          <li className="addleads" onClick={AddLeads}>Website Leads</li>
          <li className="addleads" onClick={About}>About Project</li>

          {/* Search for mobile */}
          <li className="mobile-search">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search something..."
              />
              <button className="btn btn-primary">Search</button>
            </div>
          </li>
        </ul>

        {/* Search for desktop */}
        <div className="search-box">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search something..."
            />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
