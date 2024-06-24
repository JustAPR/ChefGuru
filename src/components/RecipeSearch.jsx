import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "./RecipeContext";

const RecipeSearch = () => {
  const { setIngredient, setIsSearched, setRecipes } =
    useContext(RecipeContext);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`
        );
        const data = await response.json();
        if (data.meals) {
          setSuggestions(data.meals.map((meal) => meal.strMeal));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    if (inputValue) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    setIsSearched(true);
    setIngredient(inputValue);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
      );
      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        alert("No recipes found");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes");
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="I have...."
      />
      <button onClick={handleSearch}>Search</button>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => setInputValue(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeSearch;
