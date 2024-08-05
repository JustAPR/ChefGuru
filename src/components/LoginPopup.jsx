import React, { useState, useContext } from "react";
import axios from "axios";
import { RecipeContext } from "./RecipeContext";
import "./Popup.css";

const LoginPopup = ({ closePopup, onLoginSuccess }) => {
  const { setIsAuthenticated, setUserId } = useContext(RecipeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/login", { email, password });
      if (response.data.message === "success") {
        onLoginSuccess(response.data.userId);
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      setMessage("An error occurred while logging in");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="popup-title">Login</h2>
        <form className="popup-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && <p className="message">{message}</p>}
          <div className="popup-buttons">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={closePopup}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;