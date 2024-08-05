const mongoose = require('mongoose');

const UserUploadedRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  directions: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }
});

const UserUploadedRecipe = mongoose.model('UserUploadedRecipe', UserUploadedRecipeSchema);

module.exports = UserUploadedRecipe;
