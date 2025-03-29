import React from "react";

function TourismPackages() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Explore Our Tourism Packages</h1>
      <p>Find exciting tourism packages to your favorite destinations.</p>
      <a
        href="https://www.tourismagency.gov/packages"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        View Tourism Packages
      </a>
    </div>
  );
}

export default TourismPackages;
