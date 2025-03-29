import React from "react";

function AGWarrant() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Request a Warrant</h1>
      <p>
        Click the button below to request a warrant through the AG Office website.
      </p>
      <a
        href="https://www.agoffice.gov/request-warrant" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "5px",
          fontSize: "18px",
          marginTop: "10px",
        }}
      >
        Request Warrant
      </a>
    </div>
  );
}

export default AGWarrant;
