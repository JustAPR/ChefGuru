import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "./RecipeContext";

const RecipeResults = () => {
  const { recipes, setRecipes, ingredient, setClickedImg } =
    useContext(RecipeContext);
  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian"
        );
        const data = await response.json();
        if (data.meals) {
          setRecipes(data.meals);
        }
      } catch (error) {
        console.error("Error fetching all recipes:", error);
      }
    };

    fetchAllRecipes();
  }, [setRecipes]);

  const handleClick = (imgUrl) => {
    setClickedImg(imgUrl);
  };

  return (
    <div className="results-container">
      <h2 className="display-text">
        {ingredient ? `Results for "${ingredient}"` : "All Recipes"}
      </h2>
      <div className="cards-container">
        {recipes.map((recipe, index) => (
          <Link
            to={`/recipe/${recipe.strMeal}`}
            key={index}
            className="card"
            onClick={() => handleClick(recipe.strMealThumb)}
          >
            <h3 className="card-header-main">{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipeResults;
