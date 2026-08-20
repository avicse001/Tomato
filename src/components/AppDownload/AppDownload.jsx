import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <div className="app-download-content">
        <span className="app-badge">Experience Mobile Ordering</span>
        <h2>For Better Experience Download <br /> <span>Tomato.</span> App</h2>
        <p>Order food from anywhere, track your delivery in real-time, and get exclusive mobile discounts.</p>
        <div className="app-download-platforms">
          <img src={assets.play_store} alt="Play Store" className="store-badge" />
          <img src={assets.app_store} alt="App Store" className="store-badge" />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
