// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Section 1: About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
          Sri Lanka Railway operates approximately 310 trains which include 45 Long-Distance and 12 Intercity 
          trains and carries about 0.29 Million passengers daily. SLR owns and maintains 
          1420 km of rail tracks, 175 locomotives, 900 carriages and the signalling network.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/trains">Trains</a></li>
            <li><a href="/booking">Booking</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@railway.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        {/* Section 4: Social Media Links */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section (Copyright) */}
      <div className="footer-bottom">
        <p>&copy; 2025 Railway Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
