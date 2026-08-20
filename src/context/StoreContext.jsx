import React, { createContext, useEffect, useState } from "react";
import { food_list, menu_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // Cart state initialized from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("food_del_cart");
    return saved ? JSON.parse(saved) : {};
  });

  // User auth state initialized from localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("food_del_token") || "";
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("food_del_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Saved Orders history initialized from localStorage
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("food_del_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Promo code discounts
  const [appliedPromo, setAppliedPromo] = useState(() => {
    const saved = localStorage.getItem("food_del_promo");
    return saved ? JSON.parse(saved) : null;
  });

  // Global search and toast notifications
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("food_del_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync token and user to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("food_del_token", token);
      if (user) localStorage.setItem("food_del_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("food_del_token");
      localStorage.removeItem("food_del_user");
    }
  }, [token, user]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem("food_del_orders", JSON.stringify(orders));
  }, [orders]);

  // Sync promo to localStorage
  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem("food_del_promo", JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem("food_del_promo");
    }
  }, [appliedPromo]);

  const showToast = (message, type = "success") => {
    setToastMessage({ message, type, id: Date.now() });
  };

  const addToCart = (itemId) => {
    const item = food_list.find((p) => p._id === itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (item) {
      showToast(`Added "${item.name}" to cart!`, "success");
    }
  };

  const removeFromCart = (itemId) => {
    const item = food_list.find((p) => p._id === itemId);
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
    if (item) {
      showToast(`Removed "${item.name}" from cart`, "info");
    }
  };

  const deleteFromCart = (itemId) => {
    const item = food_list.find((p) => p._id === itemId);
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    if (item) {
      showToast(`Removed all "${item.name}" from cart`, "info");
    }
  };

  const clearCart = () => {
    setCartItems({});
    setAppliedPromo(null);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  };

  const getDiscountAmount = () => {
    const subtotal = getTotalCartAmount();
    if (!appliedPromo || subtotal === 0) return 0;
    if (appliedPromo.type === "percentage") {
      return (subtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === "fixed") {
      return Math.min(appliedPromo.value, subtotal);
    }
    return 0;
  };

  const getDeliveryFee = () => {
    const subtotal = getTotalCartAmount();
    if (subtotal === 0) return 0;
    if (appliedPromo && appliedPromo.freeDelivery) return 0;
    return subtotal > 50 ? 0 : 2; // Free delivery over $50
  };

  const getFinalTotal = () => {
    const subtotal = getTotalCartAmount();
    if (subtotal === 0) return 0;
    const discount = getDiscountAmount();
    const delivery = getDeliveryFee();
    return Math.max(0, subtotal - discount + delivery);
  };

  const applyPromoCode = (code) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === "DISCOUNT10" || cleaned === "TOMATO10") {
      setAppliedPromo({ code: cleaned, type: "percentage", value: 10, description: "10% OFF on all items" });
      showToast("Coupon applied! 10% Discount saved.", "success");
      return { success: true, message: "10% Discount Applied!" };
    } else if (cleaned === "FREEFOOD" || cleaned === "FREEDEL") {
      setAppliedPromo({ code: cleaned, freeDelivery: true, type: "fixed", value: 0, description: "Free Delivery unlocked" });
      showToast("Coupon applied! Free Delivery unlocked.", "success");
      return { success: true, message: "Free Delivery Applied!" };
    } else if (cleaned === "SAVE20") {
      setAppliedPromo({ code: cleaned, type: "percentage", value: 20, description: "20% OFF on orders" });
      showToast("Mega deal! 20% Discount saved.", "success");
      return { success: true, message: "20% Discount Applied!" };
    } else {
      showToast("Invalid Promo Code", "error");
      return { success: false, message: "Invalid promo code" };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast("Promo code removed", "info");
  };

  const placeOrder = (orderDetails) => {
    const orderItems = [];
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          orderItems.push({
            ...itemInfo,
            quantity: cartItems[item],
          });
        }
      }
    }

    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: orderItems,
      amount: getFinalTotal(),
      address: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod,
      paymentStatus: orderDetails.paymentMethod === "cod" ? "Pending (COD)" : "Paid Online",
      status: "Food Processing", // Stages: "Food Processing" -> "Out for delivery" -> "Delivered"
      statusStep: 1, // 1: Order Placed/Processing, 2: Out for delivery, 3: Delivered
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`, "success");
    return newOrder;
  };

  const loginUser = (email, name = "Foodie") => {
    const mockToken = "jwt_" + Math.random().toString(36).substring(2);
    const mockUser = {
      name: name,
      email: email,
      joined: new Date().toLocaleDateString(),
    };
    setToken(mockToken);
    setUser(mockUser);
    showToast(`Welcome back, ${name}!`, "success");
  };

  const logoutUser = () => {
    setToken("");
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  const contextValue = {
    food_list,
    menu_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    getTotalCartAmount,
    getTotalCartCount,
    getDiscountAmount,
    getDeliveryFee,
    getFinalTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    orders,
    placeOrder,
    token,
    user,
    loginUser,
    logoutUser,
    searchQuery,
    setSearchQuery,
    toastMessage,
    showToast,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
