import React, { useState } from "react";
import axios from "axios";
import "./Popup.css";

function SignupPopup({ closePopup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8001/register", { email, password })
      .then(response => {
        setMessage("Registration successful");
        closePopup();
      })
      .catch(error => {
        setMessage(error.response.data.error);
      });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="popup-title">Signup</h2>
        <form className="popup-form" onSubmit={handleSignup}>
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
            <button type="submit" className="btn btn-primary">Signup</button>
            <button type="button" className="btn btn-secondary" onClick={closePopup}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPopup;