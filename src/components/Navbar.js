import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Train System</div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/trains" style={styles.link}>Trains</Link>
        <Link to="/schedule" style={styles.link}>Train Schedule</Link>
        <Link to="/tickets" style={styles.link}>Ticket Categories</Link>
        <Link to="/special-trains" style={styles.link}>Special Trains</Link>  {/* ✅ Add Special Trains */}
        <Link to="/booking" style={styles.link}>Booking</Link>
        <Link to="/warrant" style={styles.link}>AG Warrant</Link>
        <Link to="/tourism" style={styles.link}>Tourism Packages</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#007bff",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
  }
};

export default Navbar;
