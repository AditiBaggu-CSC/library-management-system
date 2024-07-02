import React from "react";
import Navbar from "./Navbar";
import "./Homepage.css";
import RegistrationImage from "./images/Logo(1).png";
import PaymentsImage from "./images/Logo(1).png";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <div className="image-container">
        <div className="image-box">
          <h2 className="image-heading">Registration Form</h2>
          <img src={RegistrationImage} alt="Registration Form" />
        </div>
        <div className="image-box">
          <h2 className="image-heading">Monthly Payments</h2>
          <img src={PaymentsImage} alt="Monthly Payments" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
