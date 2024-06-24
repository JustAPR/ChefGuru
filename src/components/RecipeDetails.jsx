import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { title } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`
        );
        const data = await response.json();
        if (data.meals) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [title]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <h2 className="single-card-header card-d">{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <h3 className="single-card-ingredients card-d">Ingredients</h3>
      <ul>
        {Array.from({ length: 20 }, (_, i) => i + 1)
          .map((i) => ({
            ingredient: recipe[`strIngredient${i}`],
            measure: recipe[`strMeasure${i}`],
          }))
          .filter((item) => item.ingredient && item.ingredient.trim() !== "")
          .map((item, index) => (
            <li key={index}>
              <p className="ingredient-content">
                {" "}
                {item.ingredient}: {item.measure}
              </p>
            </li>
          ))}
      </ul>
      <h3 className="single-card-instructions card-d">Instructions</h3>
      <p className="instructions-content">{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetails;
