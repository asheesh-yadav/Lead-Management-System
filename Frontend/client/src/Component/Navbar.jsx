import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
 
  const navigate = useNavigate();
  const handleHome = ()=>{
    navigate("/")
  }
  const AddLeads = ()=>{
    navigate("/leads")
  }

  const About = ()=>{
    navigate("/about")
  }



  return (
    <div>
     <div
      className="w-100"
      style={{
        background: "#101720",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "60px",
        position: "relative", 
      }}
    >
      <ul
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          listStyle: "none",
          gap: "20px",
          fontSize: "20px",
          margin: 0,
        }}
      >
    <li className='homeMenue' onClick={handleHome}>Home</li>
        <li>DashBoard</li>
        <li className='addleads' onClick={AddLeads}>Website Leads</li>
        <li className='addleads' onClick={About}>About Project</li>
      </ul>
  <div class="input-group  d-flex" style={{width:"300px"}}>
    <input type="text" class="form-control" placeholder="Search something..." />
    <button class="btn btn-primary" type="button">Search</button>
</div>
    </div>
 
  </div>
  )
}

export default Navbar
