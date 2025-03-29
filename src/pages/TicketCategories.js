import React from "react";

function TicketCategories() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ticket Categories</h1>
      <p>Select a ticket category for your journey.</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ background: "#28a745", color: "#fff", padding: "10px", margin: "5px", borderRadius: "5px" }}>
          <strong>Economy Class</strong> - Affordable and comfortable
        </li>
        <li style={{ background: "#ffc107", color: "#000", padding: "10px", margin: "5px", borderRadius: "5px" }}>
          <strong>Business Class</strong> - Extra legroom and premium service
        </li>
        <li style={{ background: "#dc3545", color: "#fff", padding: "10px", margin: "5px", borderRadius: "5px" }}>
          <strong>First Class</strong> - Luxury experience with top-tier service
        </li>
      </ul>
    </div>
  );
}

export default TicketCategories;
