import React, { createContext, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [clickedImg, setClickedImg] = useState(""); // Add clickedImg state

  return (
    <RecipeContext.Provider
      value={{
        ingredient,
        setIngredient,
        recipes,
        setRecipes,
        isSearched,
        setIsSearched,
        clickedImg,
        setClickedImg,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
