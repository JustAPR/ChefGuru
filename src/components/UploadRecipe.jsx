import React, { useState, useContext } from "react";
import axios from "axios";
import { RecipeContext } from "./RecipeContext";

const UploadRecipe = () => {
  const { userId } = useContext(RecipeContext);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/upload-recipe", {
        userId,
        title,
        ingredients,
        directions,
      });

      if (response.status === 200) {
        setMessage("Recipe uploaded successfully!");
        setTitle("");
        setIngredients("");
        setDirections("");
      }
    } catch (error) {
      console.error("Error uploading recipe:", error);
      setMessage("Failed to upload recipe.");
    }
  };

  return (
    <div className="upload-recipe">
      <h2>Upload Recipe</h2>
      <form onSubmit={handleUpload}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Directions:</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default UploadRecipe;
