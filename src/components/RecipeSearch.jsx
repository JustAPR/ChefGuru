import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "./RecipeContext";

const RecipeSearch = () => {
  const { setIngredient, setIsSearched, setRecipes } = useContext(RecipeContext);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    setIsSearched(true);
    setIngredient(inputValue);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/?s=${inputValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const parsedData = JSON.parse(data);
      setLoading(false);
      if (parsedData.length > 0) {
        setRecipes(parsedData);
        navigate(`/recipe/${parsedData[0].title}`, { state: { recipe: parsedData[0] } });
      } else {
        setRecipes([]);
        alert("No recipes found");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
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
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default RecipeSearch;
