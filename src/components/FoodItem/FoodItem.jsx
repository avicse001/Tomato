import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image, category }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const quantity = cartItems[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} loading="lazy" />
        <span className="food-item-category-tag">{category}</span>

        {quantity === 0 ? (
          <img
            className="add-btn-init"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
            title="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Decrease quantity"
              title="Decrease quantity"
            />
            <span className="counter-num">{quantity}</span>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Increase quantity"
              title="Increase quantity"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3>{name}</h3>
          <img src={assets.rating_starts} alt="Rating stars" className="rating-stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-price-action">
          <p className="food-item-price">${price}</p>
          {quantity > 0 ? (
            <span className="in-cart-badge">In Cart ({quantity})</span>
          ) : (
            <button
              className="quick-add-text-btn"
              onClick={() => addToCart(id)}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
