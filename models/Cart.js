const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  _user: [{ type: Schema.Types.ObjectId, ref: "user" }],
  items: [String],
});

mongoose.model("cart", cartSchema);
