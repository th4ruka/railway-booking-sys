import React, { useState } from "react";
import "../styles/Home.css"; // Import CSS file
import TrainTracker from "../components/TrainTracker";

const Home = () => {
  const [imageSrc, setImageSrc] = useState("/images/train-icon.jpg");

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome ON TIME TO RAIL-RUNNER</h1>
          <p>
            Our platform makes it easy for you to search for trains, view schedules, 
            and book tickets effortlessly.
          </p>
        </div>

        {/* Image that changes on hover */}
        <div 
          className="hover-image" 
          onMouseEnter={() => setImageSrc("/images/train-hover.jpg")} 
          onMouseLeave={() => setImageSrc("/images/train-icon.jpg")}
        >
          <img src={imageSrc} alt="Train Booking" />
        </div>
      </div>

      {/* Real-Time Train Tracker */}
      <div className="tracking-section">
        <h1>Track Your Train in Real-Time</h1>
        <TrainTracker />
      </div>
    </div>
  );
};

export default Home;
