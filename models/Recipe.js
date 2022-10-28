const mongoose = require("mongoose");
const { Schema } = mongoose;
// const ingredient = require("./Ingredient");

const recipeSchema = new Schema({
  name: String,
  instructions: [String],
  ingredients: [String],
});

mongoose.model("recipes", recipeSchema);