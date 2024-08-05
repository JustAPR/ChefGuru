import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RecipeContext } from "./RecipeContext";
import "./Favorites.css";

const Favorites = () => {
  const { userId } = useContext(RecipeContext);
  const [favorites, setFavorites] = useState([]);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/favorites/${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    const fetchUploads = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/user-recipes/${userId}`);
        setUploads(response.data);
      } catch (error) {
        console.error("Error fetching uploads:", error);
      }
    };

    fetchFavorites();
    fetchUploads();
  }, [userId]);

  const handleRemoveFromFavorites = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/favorites/${id}`);
      setFavorites(favorites.filter(favorite => favorite._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleRemoveUpload = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/user-recipes/${id}`);
      setUploads(uploads.filter(upload => upload._id !== id));
    } catch (error) {
      console.error("Error removing upload:", error);
    }
  };

  return (
    <div className="favorites">
      <h2>Your Favorite Recipes</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite._id}>
              <h3>{favorite.recipeId.title}</h3>
              <p>{favorite.recipeId.ingredients}</p>
              <p>{favorite.recipeId.directions}</p>
              <button onClick={() => handleRemoveFromFavorites(favorite._id)} className="btn btn-danger">
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite recipes found.</p>
      )}
      <h2>Your Uploaded Recipes</h2>
      {uploads.length > 0 ? (
        <ul>
          {uploads.map((upload) => (
            <li key={upload._id}>
              <h3>{upload.title}</h3>
              <p>{upload.ingredients}</p>
              <p>{upload.directions}</p>
              <button onClick={() => handleRemoveUpload(upload._id)} className="btn btn-danger">
                Remove Upload
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No uploaded recipes found.</p>
      )}
    </div>
  );
};

export default Favorites;
