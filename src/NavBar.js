import  "./App.css";
import React from "react";
import { NavLink, Link} from "react-router-dom";
import { useAuth } from "./Authe";
import logo from "./logo.png"; 

const NavBar = () => {
  const{user,logout}=useAuth()
  const data=useAuth()
  console.log(data)


  function handleLogout() {
    logout()
  }

  return (
    <div className="nav">
      <div className="logodiv">
      <img  src={logo} alt="logo"/>
      <p>Kafene</p>
      </div>
    <nav >
      <NavLink to="/orders" >Orders</NavLink>
      <NavLink to="/product">Product</NavLink>
      <NavLink to="/users">Users</NavLink>
      
        </nav>
        {/* <Link id="logout"> */}
        {
            user &&
            <Link to='/login' id="logout" onClick={handleLogout}>Logout</Link>
        }
        {/* </Link> */}
        </div>    
  );
};

export default NavBar;
