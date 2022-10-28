// external dependencies
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// internal dependencies
const keys = require("./config/keys.js");
require("./models/User");
require("./models/Recipe");
require("./services/passport"); //doesn't need to be assigned to anything since the file isn't returning anything. Just need to attach it to this file for usage

const app = express();
const PORT = process.env.PORT || 5000;

//attaches body parser middleware to express
app.use(bodyParser.json());

/////Enable Cookies/////
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, // 30 days (in milliseconds)
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize()); //.use attaches middleware to the express app
app.use(passport.session()); // passes data thru the middleware before hitting app

/////Connect to mongoDB via mongoose/////
mongoose.connect(keys.mongoURI);

/////Attach routes to express app/////
require("./routes/authRoutes")(app);
require("./routes/recipeRoutes")(app);

/////In prod, serve the client also/////
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  //if we get a request for a route we don't know (in the express or client app), serve up index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/////Spin up app on PORT/////
app.listen(PORT);
