import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Link to="/">
            <img src={assets.logo} alt="Tomato Logo" className="footer-logo" />
          </Link>
          <p>
            Experience the best flavors delivered hot and fresh right to your doorstep. We partner with top-rated local restaurants to bring you extraordinary dining at unbeatable convenience.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h3>COMPANY</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#explore-menu">About Us</a></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><a href="#app-download">Mobile App</a></li>
            <li><a href="#footer">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h3>GET IN TOUCH</h3>
          <ul>
            <li>📞 +1-212-456-7890</li>
            <li>✉️ contact@tomato.com</li>
            <li>📍 123 Food Street, Gourmet City, NY</li>
            <li>🕒 Mon - Sun: 8:00 AM - 11:00 PM</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright © 2026 Tomato.com - All Rights Reserved. Crafted for food lovers.
        </p>
        <div className="footer-badges">
          <span>⚡ Fast Delivery</span>
          <span>🔒 100% Secure Checkout</span>
          <span>⭐ 4.9/5 Rating</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
