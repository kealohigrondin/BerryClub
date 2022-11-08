const mongoose = require("mongoose");
const { Schema } = mongoose;
const Item = require("./Item");

const cartSchema = new Schema({
  _user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  items: [Item],
});

mongoose.model("cart", cartSchema);
