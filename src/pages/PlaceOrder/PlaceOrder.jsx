import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getDiscountAmount,
    getDeliveryFee,
    getFinalTotal,
    appliedPromo,
    placeOrder,
    user,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "United States",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'cod', 'stripe', 'upi'
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: "",
  });
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const delivery = getDeliveryFee();
  const grandTotal = getFinalTotal();

  useEffect(() => {
    if (subtotal === 0) {
      navigate("/cart");
    }
  }, [subtotal, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.street || !formData.city || !formData.phone) {
      setFormError("Please fill in all mandatory delivery details.");
      return;
    }

    if (paymentMethod === "stripe" && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc)) {
      setFormError("Please enter valid card payment details.");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      setFormError("Please enter your UPI ID.");
      return;
    }

    setIsProcessing(true);

    // Simulate swift network verification
    setTimeout(() => {
      placeOrder({
        address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zipcode}, ${formData.country}`,
        customerName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        paymentMethod: paymentMethod,
      });

      setIsProcessing(false);
      navigate("/myorders");
    }, 800);
  };

  return (
    <form onSubmit={handleOrderSubmit} className="place-order">
      <div className="place-order-left">
        <h2 className="title">Delivery Information</h2>
        
        {formError && <div className="order-error-banner">{formError}</div>}

        <div className="multi-fields">
          <div className="input-box">
            <label>First name *</label>
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={formData.firstName}
              type="text"
              placeholder="e.g. John"
            />
          </div>
          <div className="input-box">
            <label>Last name</label>
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={formData.lastName}
              type="text"
              placeholder="e.g. Doe"
            />
          </div>
        </div>

        <div className="input-box">
          <label>Email address *</label>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
            type="email"
            placeholder="e.g. john@example.com"
          />
        </div>

        <div className="input-box">
          <label>Street Address *</label>
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={formData.street}
            type="text"
            placeholder="e.g. Apt 4B, 123 Main Street"
          />
        </div>

        <div className="multi-fields">
          <div className="input-box">
            <label>City *</label>
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={formData.city}
              type="text"
              placeholder="e.g. New York"
            />
          </div>
          <div className="input-box">
            <label>State *</label>
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={formData.state}
              type="text"
              placeholder="e.g. NY"
            />
          </div>
        </div>

        <div className="multi-fields">
          <div className="input-box">
            <label>Zip code *</label>
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={formData.zipcode}
              type="text"
              placeholder="e.g. 10001"
            />
          </div>
          <div className="input-box">
            <label>Country *</label>
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={formData.country}
              type="text"
              placeholder="e.g. United States"
            />
          </div>
        </div>

        <div className="input-box">
          <label>Phone Number *</label>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={formData.phone}
            type="tel"
            placeholder="e.g. +1 (555) 019-2834"
          />
        </div>
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Order Summary</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details discount-row">
                  <p>Promo Discount ({appliedPromo?.code})</p>
                  <p>-${discount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{delivery === 0 ? <span className="free-tag">FREE</span> : `$${delivery.toFixed(2)}`}</p>
            </div>
            <hr />
            <div className="cart-total-details grand-total">
              <b>Total Amount</b>
              <b>${grandTotal.toFixed(2)}</b>
            </div>
          </div>

          <div className="payment-options">
            <h2>Payment Method</h2>
            
            <div
              className={`payment-option-card ${paymentMethod === "cod" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("cod")}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <div className="option-info">
                <p className="option-title">💵 Cash on Delivery (COD)</p>
                <span>Pay in cash when your fresh food arrives at your door</span>
              </div>
            </div>

            <div
              className={`payment-option-card ${paymentMethod === "stripe" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("stripe")}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              <div className="option-info">
                <p className="option-title">💳 Credit / Debit Card (Stripe)</p>
                <span>Fast & secure online card payment</span>
              </div>
            </div>

            {paymentMethod === "stripe" && (
              <div className="card-input-details">
                <input
                  type="text"
                  placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                  maxLength="19"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                />
                <div className="card-sub-inputs">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="CVC"
                    maxLength="4"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div
              className={`payment-option-card ${paymentMethod === "upi" ? "selected" : ""}`}
              onClick={() => setPaymentMethod("upi")}
            >
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              <div className="option-info">
                <p className="option-title">📱 UPI / Net Banking</p>
                <span>Google Pay, PhonePe, Paytm, or UPI ID</span>
              </div>
            </div>

            {paymentMethod === "upi" && (
              <div className="upi-input-details">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. username@okhdfcbank)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="place-order-submit-btn"
          >
            {isProcessing ? "Processing Order..." : `PLACE ORDER • $${grandTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;