import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "./RecipeContext";

const NavBar = () => {
  const { clickedImg, setClickedImg, ingredient, setIngredient } =
    useContext(RecipeContext);

  function handleHomeClick() {
    setClickedImg("");
    setIngredient("");
  }

  return (
    <nav className="navbar" style={{ display: clickedImg ? "block" : "none" }}>
      <Link
        to="/"
        onClick={handleHomeClick}
        aria-label="Back"
        className="back-arrow"
      >
        Home
      </Link>
    </nav>
  );
};

export default NavBar;
