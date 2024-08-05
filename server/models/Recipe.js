const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  directions: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true } // Ensure 'Employee' matches your user model name
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
