import React from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "./RecipeContext";
import axios from "axios";

const RecipeDetails = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const { isAuthenticated, userId } = useContext(RecipeContext);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:8001/add-to-favorites', {
        userId: userId,
        recipe: recipe
      });
      if (response.status === 200) {
        alert('Recipe added to favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add recipe to favorites');
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredients = recipe.ingredients.split("--").map((item) => item.trim());
  const directions = recipe.directions.split("--").map((item) => item.trim());

  return (
    <div className="recipe-details">
      <h2 className="single-card-header card-d">{recipe.title}</h2>
      <h3 className="single-card-ingredients card-d">Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <p className="ingredient-content">{ingredient}</p>
          </li>
        ))}
      </ul>
      <h3 className="single-card-instructions card-d">Instructions</h3>
      <p className="instructions-content">{directions.join(". ")}</p>
      {isAuthenticated && (
        <button onClick={handleAddToFavorites} className="btn btn-primary">
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default RecipeDetails;
