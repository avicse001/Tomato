import React, { useContext, useEffect, useRef } from "react";
import "./SearchPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const SearchPopup = ({ setShowSearch }) => {
  const { searchQuery, setSearchQuery, food_list, addToCart } = useContext(StoreContext);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchResults = searchQuery
    ? food_list.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectFood = (_categoryName) => {
    setShowSearch(false);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("food-display");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="search-popup">
      <div className="search-popup-backdrop" onClick={() => setShowSearch(false)} />
      <div className="search-popup-container">
        <div className="search-bar-wrap">
          <img src={assets.search_icon} alt="Search" className="search-icon-input" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for delicious dishes, categories (e.g. Pasta, Salad, Cake)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-text-btn" onClick={() => setSearchQuery("")}>
              ✕
            </button>
          )}
          <button className="close-search-btn" onClick={() => setShowSearch(false)}>
            Close
          </button>
        </div>

        {searchQuery ? (
          <div className="search-results-list">
            <p className="search-results-title">
              Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}:
            </p>
            {searchResults.length === 0 ? (
              <div className="no-search-results">
                <span>🔍</span>
                <p>No dishes matched "{searchQuery}"</p>
              </div>
            ) : (
              searchResults.map((item) => (
                <div key={item._id} className="search-result-item">
                  <img src={item.image} alt={item.name} className="search-item-thumb" />
                  <div className="search-item-info">
                    <h4>{item.name}</h4>
                    <span className="search-item-cat">{item.category}</span>
                    <span className="search-item-price">${item.price}</span>
                  </div>
                  <div className="search-item-actions">
                    <button
                      className="search-add-btn"
                      onClick={() => {
                        addToCart(item._id);
                      }}
                    >
                      + Add
                    </button>
                    <button
                      className="search-view-btn"
                      onClick={() => handleSelectFood(item.category)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="search-suggestions">
            <p className="popular-searches-title">Popular Searches:</p>
            <div className="popular-tags">
              {["Salad", "Rolls", "Cake", "Pasta", "Noodles", "Pure Veg", "Deserts"].map((tag) => (
                <span
                  key={tag}
                  className="popular-tag-item"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPopup;
