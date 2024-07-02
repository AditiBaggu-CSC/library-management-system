import React from "react";
import { Button } from "antd";
import "./Navbar.css";
import logo from "./images/Logo(1).png";

const Navbar = () => {
  return (
    <div className="floating-navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <Button type="primary" className="navbar-signup-button">
        Sign Up for Admin
      </Button>
    </div>
  );
};

export default Navbar;
