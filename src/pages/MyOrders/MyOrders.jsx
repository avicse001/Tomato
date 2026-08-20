import React, { useContext, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { orders, addToCart, showToast } = useContext(StoreContext);
  const navigate = useNavigate();
  const [activeTracking, setActiveTracking] = useState({});

  const handleTrackProgress = (orderId) => {
    setActiveTracking((prev) => {
      const currentStep = prev[orderId] || 1;
      const nextStep = currentStep < 3 ? currentStep + 1 : 1;
      return { ...prev, [orderId]: nextStep };
    });
    showToast("Order status refreshed!", "info");
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item._id);
      }
    });
    showToast("Items added back to cart!", "success");
    navigate("/cart");
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="my-orders-empty">
        <div className="empty-orders-card">
          <div className="empty-orders-icon">📦</div>
          <h2>No Orders Placed Yet</h2>
          <p>You haven't placed any orders with us yet. Choose your favorite dish and get it delivered fast!</p>
          <button className="browse-menu-btn" onClick={() => navigate("/")}>
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders">
      <div className="my-orders-header">
        <h1>My Orders ({orders.length})</h1>
        <p>Track your past and ongoing food orders live</p>
      </div>

      <div className="orders-container">
        {orders.map((order, index) => {
          const currentStep = activeTracking[order.id] || 1;
          const statusText =
            currentStep === 1
              ? "Food Processing"
              : currentStep === 2
              ? "Out for Delivery 🛵"
              : "Delivered 🎉";

          return (
            <div key={order.id || index} className="order-card">
              <div className="order-card-top">
                <div className="order-header-info">
                  <img src={assets.parcel_icon} alt="Parcel" className="parcel-icon" />
                  <div>
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                </div>
                <div className="order-amount-badge">
                  <span>Total Paid:</span>
                  <strong>${order.amount.toFixed(2)}</strong>
                </div>
              </div>

              {/* Items summary */}
              <div className="order-items-preview">
                <p className="items-text">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="item-chip">
                      {item.name} × {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <span className="items-count-tag">
                  {order.items.reduce((acc, curr) => acc + curr.quantity, 0)} Items
                </span>
              </div>

              {/* Status Stepper */}
              <div className="order-status-tracker">
                <div className="status-steps">
                  <div className={`step-node ${currentStep >= 1 ? "active" : ""}`}>
                    <span className="node-dot">1</span>
                    <span className="node-label">Confirmed</span>
                  </div>
                  <div className={`step-line ${currentStep >= 2 ? "active" : ""}`}></div>
                  <div className={`step-node ${currentStep >= 2 ? "active" : ""}`}>
                    <span className="node-dot">2</span>
                    <span className="node-label">Preparing</span>
                  </div>
                  <div className={`step-line ${currentStep >= 3 ? "active" : ""}`}></div>
                  <div className={`step-node ${currentStep >= 3 ? "active" : ""}`}>
                    <span className="node-dot">3</span>
                    <span className="node-label">On the way</span>
                  </div>
                </div>
              </div>

              <div className="order-card-bottom">
                <div className="order-status-indicator">
                  <span className={`status-pill pill-step-${currentStep}`}>
                    ● {statusText}
                  </span>
                  <span className="payment-type">
                    💳 {order.paymentMethod ? order.paymentMethod.toUpperCase() : "COD"}
                  </span>
                </div>

                <div className="order-actions">
                  <button
                    className="track-order-btn"
                    onClick={() => handleTrackProgress(order.id)}
                  >
                    Track Status 🔄
                  </button>
                  <button
                    className="reorder-btn"
                    onClick={() => handleReorder(order)}
                  >
                    Reorder 🔁
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
