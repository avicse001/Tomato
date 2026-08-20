import React from "react";
import "./Header.css";

const Header = () => {
  const scrollToMenu = () => {
    const el = document.getElementById("explore-menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <span className="header-tag">⚡ Fast 30-Min Delivery</span>
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Satisfy your cravings with our chef-special recipes!
        </p>
        <button onClick={scrollToMenu}>View Menu ↓</button>
      </div>
    </div>
  );
};

export default Header;