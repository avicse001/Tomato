import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { loginUser } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (currState === "Sign Up" && !data.name) {
      setError("Please enter your name.");
      return;
    }
    if (!agree) {
      setError("Please agree to the terms of use & privacy policy.");
      return;
    }

    // Process login or registration
    loginUser(data.email, currState === "Sign Up" ? data.name : (data.email.split("@")[0]));
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <div className="login-popup-backdrop" onClick={() => setShowLogin(false)} />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="close-btn"
          />
        </div>

        {error && <div className="login-popup-error">{error}</div>}

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <div className="input-group">
              <label>Your Name</label>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="e.g. John Doe"
                required
              />
            </div>
          )}
          <div className="input-group">
            <label>Email Address</label>
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="e.g. name@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <button type="submit" className="login-popup-btn">
          {currState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            id="terms"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="terms">
            By continuing, I agree to the <a href="#privacy">terms of use</a> & <a href="#privacy">privacy policy</a>.
          </label>
        </div>

        {currState === "Login" ? (
          <p className="toggle-auth">
            Don't have an account?{" "}
            <span onClick={() => { setCurrState("Sign Up"); setError(""); }}>
              Sign up here
            </span>
          </p>
        ) : (
          <p className="toggle-auth">
            Already have an account?{" "}
            <span onClick={() => { setCurrState("Login"); setError(""); }}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
