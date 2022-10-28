const mongoose = require("mongoose");
const { Schema } = mongoose; //destructures mongoose.Schema out of mongoose

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  name: { familyName: String, givenName: String },
  recipes: [{ type: Schema.Types.ObjectId, ref: "recipes" }],
});

//Create and use a mongodb collection of name 'users' with schema userSchema
mongoose.model("users", userSchema);
