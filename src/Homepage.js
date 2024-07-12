import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Homepage.css";

const HomePage = () => {
  const [images, setImages] = useState({
    registrationImage: "",
    paymentsImage: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://modern-study-library.drhlabs.com/api/images/get/images`
        );
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImages({
            registrationImage: `https://modern-study-library.drhlabs.com/${data.images.registrationImage}`,
            paymentsImage: `https://modern-study-library.drhlabs.com/${data.images.paymentsImage}`,
            suggestionsImage: `https://modern-study-library.drhlabs.com/${data.images.suggestionsImage}`,
          });
        } else {
          throw new Error("Failed to fetch images");
        }
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <Navbar />
      <div className="image-container">
        <div className="image-box">
          <div className="image-heading">
            <h2>Registration Form</h2>
          </div>
          <img
            src={images.registrationImage}
            alt="Registration Form"
            className="image-right"
            onClick={() => handleImageClick("/register")}
          />
        </div>
        <div className="image-box">
          <div className="image-heading">
            <h2>Monthly Payments</h2>
          </div>
          <img
            src={images.paymentsImage}
            alt="Monthly Payments"
            className="image-right"
            onClick={() => handleImageClick("/monthly/payment")}
          />
        </div>
        <div className="image-box">
          <div className="image-heading">
            <h2>Suggestions</h2>
          </div>
          <img
            src={images.suggestionsImage}
            alt="Suggestions"
            className="image-right"
            onClick={() => handleImageClick("/suggestions")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
