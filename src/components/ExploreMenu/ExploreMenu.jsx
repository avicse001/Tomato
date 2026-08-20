import React, { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-header">
        <span className="badge">Our Menu</span>
        <h1>Explore our delicious menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
      </div>
      <div className="explore-menu-list">
        <div
          onClick={() => setCategory("All")}
          className={`explore-menu-list-item ${category === "All" ? "active" : ""}`}
        >
          <div className="menu-avatar all-category-btn">
            <span>✨</span>
          </div>
          <p>All Dishes</p>
        </div>
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
              }
              className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
            >
              <div className="menu-avatar">
                <img
                  className={category === item.menu_name ? "active-img" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
              </div>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
