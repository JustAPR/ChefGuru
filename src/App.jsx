import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { RecipeProvider, RecipeContext } from "./components/RecipeContext.jsx";
import RecipeSearch from "./components/RecipeSearch.jsx";
import RecipeResults from "./components/RecipeResults.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";
import Favorites from "./components/Favorites.jsx";
import UploadRecipe from "./components/UploadRecipe.jsx";
import NavBar from "./components/NavBar.jsx";
import LoginPopup from "./components/LoginPopup.jsx";
import SignupPopup from "./components/SignupPopup.jsx";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUserId } = useContext(RecipeContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    setShowLoginPopup(false);
  };

  const handleSignout = () => {
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <div className="app">
      <NavBar />
      <div className="header-container">
        <Link to="/" className="header-text">
          ChefGuru
        </Link>
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <button onClick={handleSignout} className="btn btn-secondary">
                Signout
              </button>
              <Link to="/favorites" className="btn btn-primary">
                Favorites
              </Link>
              <Link to="/upload" className="btn btn-primary">
                Upload
              </Link>
            </>
          ) : (
            <>
              <button onClick={() => setShowLoginPopup(true)} className="btn btn-primary">
                Login
              </button>
              <button onClick={() => setShowSignupPopup(true)} className="btn btn-secondary">
                Signup
              </button>
            </>
          )}
        </div>
      </div>
      {showLoginPopup && (
        <LoginPopup closePopup={() => setShowLoginPopup(false)} onLoginSuccess={handleLoginSuccess} />
      )}
      {showSignupPopup && (
        <SignupPopup closePopup={() => setShowSignupPopup(false)} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RecipeSearch />
              <RecipeResults />
            </>
          }
        />
        <Route path="/recipe/:title" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/upload" element={<UploadRecipe />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <RecipeProvider>
    <Router>
      <App />
    </Router>
  </RecipeProvider>
);

export default AppWrapper;
