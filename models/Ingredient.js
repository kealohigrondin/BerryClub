const mongoose = require("mongoose");
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: String,
  quantity: Number,
  unit: String,
});
