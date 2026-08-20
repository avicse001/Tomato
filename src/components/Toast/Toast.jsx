import React, { useContext, useEffect, useState } from "react";
import "./Toast.css";
import { StoreContext } from "../../context/StoreContext";

const Toast = () => {
  const { toastMessage } = useContext(StoreContext);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      setCurrent(toastMessage);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (!visible || !current) return null;

  return (
    <div className={`toast-container toast-${current.type || "info"}`}>
      <span className="toast-icon">
        {current.type === "success" && "✓"}
        {current.type === "error" && "✕"}
        {current.type === "info" && "ℹ"}
      </span>
      <span className="toast-text">{current.message}</span>
    </div>
  );
};

export default Toast;
