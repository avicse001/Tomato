import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SearchPopup from "./components/SearchPopup/SearchPopup";
import Toast from "./components/Toast/Toast";
import "./App.css";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Toast />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showSearch && <SearchPopup setShowSearch={setShowSearch} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} setShowSearch={setShowSearch} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;