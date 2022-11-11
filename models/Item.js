const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: { type: String, unique: true },
  quantity: Number,
});
