const mongoose = require("mongoose");
const { Schema } = mongoose;
// const ingredient = require("./Ingredient");

const recipeSchema = new Schema({
  name: String,
  instructions: [String],
  ingredients: [String],
  rating: { default: 0, type: Number },
});

mongoose.model("recipes", recipeSchema);
