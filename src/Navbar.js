import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.css";
import logo from "./images/Logo(1).png";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="floating-navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      {isAuthenticated ? (
        <Button type="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Link to="/signin">
          <Button type="primary" className="navbar-signup-button">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
