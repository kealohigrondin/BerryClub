const mongoose = require("mongoose");
const { Schema } = mongoose;
const Ingredient = require("./Ingredient");

const recipeSchema = new Schema({
  name: String,
  instructions: [String],
  ingredients: [Ingredient],
  rating: { default: 0, type: Number },
  creator: { type: Schema.Types.ObjectId, ref: "user" },
});

mongoose.model("recipes", recipeSchema);
