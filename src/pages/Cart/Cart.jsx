import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    deleteFromCart,
    clearCart,
    getTotalCartAmount,
    getDiscountAmount,
    getDeliveryFee,
    getFinalTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
  } = useContext(StoreContext);

  const [promoInput, setPromoInput] = useState("");
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const discount = getDiscountAmount();
  const delivery = getDeliveryFee();
  const grandTotal = getFinalTotal();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput("");
    }
  };

  const hasItems = Object.keys(cartItems).some((key) => cartItems[key] > 0);

  if (!hasItems) {
    return (
      <div className="cart-empty-container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet. Explore our delicious menu and find something you love!</p>
          <button className="browse-menu-btn" onClick={() => navigate("/")}>
            Explore Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header-title">
        <h1>Your Shopping Cart</h1>
        <button className="clear-cart-text-btn" onClick={clearCart}>
          Clear Cart 🗑️
        </button>
      </div>

      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">${item.price}</p>
                  <div className="cart-quantity-controller">
                    <button
                      className="qty-btn"
                      onClick={() => removeFromCart(item._id)}
                      title="Decrease"
                    >
                      -
                    </button>
                    <span className="qty-val">{cartItems[item._id]}</span>
                    <button
                      className="qty-btn"
                      onClick={() => addToCart(item._id)}
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total-price">
                    ${(item.price * cartItems[item._id]).toFixed(2)}
                  </p>
                  <p
                    onClick={() => deleteFromCart(item._id)}
                    className="cross-delete-btn"
                    title="Remove item"
                  >
                    ✕
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
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
          <button
            onClick={() => navigate("/order")}
            className="checkout-btn"
          >
            PROCEED TO CHECKOUT →
          </button>
        </div>

        <div className="cart-promocode">
          <div>
            <p className="promo-lead">Have a promo code?</p>
            {appliedPromo ? (
              <div className="applied-promo-box">
                <div>
                  <span className="applied-badge">✓ ACTIVE</span>
                  <p className="applied-code">{appliedPromo.code}</p>
                  <span className="applied-desc">{appliedPromo.description}</span>
                </div>
                <button className="remove-promo-btn" onClick={removePromoCode}>
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="cart-promocode-input">
                <input
                  type="text"
                  placeholder="Enter promo code (e.g. DISCOUNT10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="submit">Apply</button>
              </form>
            )}

            <div className="available-coupons">
              <p className="coupons-title">Available Coupons (Click to apply):</p>
              <div className="coupon-chips">
                <button
                  type="button"
                  className="coupon-chip"
                  onClick={() => applyPromoCode("DISCOUNT10")}
                >
                  <strong>DISCOUNT10</strong> - 10% OFF
                </button>
                <button
                  type="button"
                  className="coupon-chip"
                  onClick={() => applyPromoCode("FREEFOOD")}
                >
                  <strong>FREEFOOD</strong> - Free Delivery
                </button>
                <button
                  type="button"
                  className="coupon-chip"
                  onClick={() => applyPromoCode("SAVE20")}
                >
                  <strong>SAVE20</strong> - 20% OFF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;