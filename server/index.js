const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const FavoriteModel = require("./models/Favorite");
const RecipeModel = require("./models/Recipe");
const UserUploadedRecipeModel = require("./models/UserUploadedRecipe");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Login_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ message: "success", userId: user._id });
        } else {
          res.status(401).json("Invalid password");
        }
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

app.get("/favorites/:userId", (req, res) => {
  const { userId } = req.params;
  FavoriteModel.find({ userId })
    .populate("recipeId")
    .then(favorites => res.json(favorites))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

app.post("/add-to-favorites", async (req, res) => {
  const { userId, recipe } = req.body;

  try {
    let existingRecipe = await RecipeModel.findOne({ title: recipe.title });
    if (!existingRecipe) {
      existingRecipe = await RecipeModel.create({ ...recipe, userId: new mongoose.Types.ObjectId(userId) });
    }

    const favorite = await FavoriteModel.create({
      userId: new mongoose.Types.ObjectId(userId),
      recipeId: existingRecipe._id,
    });

    res.json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/upload-recipe", async (req, res) => {
  const { userId, title, ingredients, directions } = req.body;

  try {
    const recipe = await UserUploadedRecipeModel.create({ userId: new mongoose.Types.ObjectId(userId), title, ingredients, directions });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/user-recipes/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const recipes = await UserUploadedRecipeModel.find({ userId: new mongoose.Types.ObjectId(userId) });
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/user-recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await UserUploadedRecipeModel.findByIdAndDelete(id);
    res.json({ message: "Recipe removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/favorites/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await FavoriteModel.findByIdAndDelete(id);
    res.json({ message: "Favorite removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(8001, () => {
  console.log("Server running at 8001");
});
