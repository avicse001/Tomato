import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin, setShowSearch }) => {
  const [menu, setMenu] = useState("home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { getTotalCartCount, token, user, logoutUser } = useContext(StoreContext);
  const cartCount = getTotalCartCount();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId, menuName) => {
    setMenu(menuName);
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="Tomato Logo" className="logo" />
      </Link>

      <ul className={`navbar-menu ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <li
          onClick={() => {
            setMenu("home");
            setMobileMenuOpen(false);
            if (location.pathname !== "/") navigate("/");
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={menu === "home" && location.pathname === "/" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => handleNavClick("explore-menu", "menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>
        <li
          onClick={() => handleNavClick("app-download", "mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-App
        </li>
        <li
          onClick={() => handleNavClick("footer", "contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </li>
      </ul>

      <div className="navbar-right">
        <button
          className="navbar-icon-btn"
          onClick={() => setShowSearch(true)}
          title="Search Food"
          aria-label="Search Food"
        >
          <img src={assets.search_icon} alt="Search" />
        </button>

        <Link to="/cart" className="navbar-search-icon" title="View Cart">
          <img src={assets.basket_icon} alt="Cart" />
          {cartCount > 0 && <div className="dot">{cartCount}</div>}
        </Link>

        {!token ? (
          <button className="sign-in-btn" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div
            className="navbar-profile"
            onMouseEnter={() => setShowProfileDropdown(true)}
            onMouseLeave={() => setShowProfileDropdown(false)}
          >
            <div className="profile-badge-btn" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <img src={assets.profile_icon} alt="Profile" className="profile-icon-img" />
              <span className="profile-name">{user?.name || "Profile"}</span>
            </div>
            {showProfileDropdown && (
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    navigate("/myorders");
                    setShowProfileDropdown(false);
                  }}
                >
                  <img src={assets.bag_icon} alt="Orders" />
                  <p>My Orders</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    logoutUser();
                    setShowProfileDropdown(false);
                  }}
                >
                  <img src={assets.logout_icon} alt="Logout" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}

        <button
          className="mobile-hamburger-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;