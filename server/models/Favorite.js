const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;
