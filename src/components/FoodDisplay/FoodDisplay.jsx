import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery, setSearchQuery } = useContext(StoreContext);

  const filteredFoods = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <div>
          <h2>Top dishes near you</h2>
          <p className="food-display-subtitle">
            Showing {filteredFoods.length} {filteredFoods.length === 1 ? "dish" : "dishes"}
            {category !== "All" && <span> in <strong>{category}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </p>
        </div>
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery("")}
          >
            Clear Search ✕
          </button>
        )}
      </div>

      {filteredFoods.length === 0 ? (
        <div className="no-food-found">
          <div className="no-food-icon">🍽️</div>
          <h3>No dishes found</h3>
          <p>We couldn't find any dishes matching your selection. Try selecting another category or clear search.</p>
          <button
            className="reset-filter-btn"
            onClick={() => setSearchQuery("")}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="food-display-list">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
