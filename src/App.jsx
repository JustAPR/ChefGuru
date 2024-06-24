import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipeProvider } from "./components/RecipeContext.jsx";
import RecipeSearch from "./components/RecipeSearch.jsx";
import RecipeResults from "./components/RecipeResults.jsx";
import RecipeDetails from "./components/RecipeDetails.jsx";
import NavBar from "./components/NavBar.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="app">
          <NavBar />
          <h1 className="header-text">ChefGuru</h1>
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
            <Route path="/recipe/:title" element={<RecipeDetails />} /> // Route
            for recipe details
          </Routes>
        </div>
      </RecipeProvider>
    </Router>
  );
}

export default App;
