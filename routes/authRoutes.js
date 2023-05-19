const passport = require("passport");
const mongoose = require("mongoose");
const Cart = mongoose.model("cart");

module.exports = (app) => {
  //passport knows to reference the GoogleStrategy as 'google' (as referenced below)
  //email is one of many permissions we can ask google for (could as for contactlist, photos, etc.)

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  //this endpoint is hit when /auth/google successfully auths user and sends them back to server
  //exchanges a code received from google in the /auth/google callback and gets user info
  app.get(
    "/auth/google/callback",

    passport.authenticate("google"),
    async (req, res) => {
      //create a cart for the user
      const existingCart = await Cart.findOne({ _user: req.user._id });
      if (!existingCart) {
        await new Cart({ _user: req.user._id, items: [] }).save();
      }
      res.redirect("/dashboard");
    }
  );

  app.get("/auth/logout", (req, res) => {
    req.logout(); //function attached to req by passport (kills cookie in browser)
    res.redirect("/");
  });

  //view currently logged in user
  app.get("/auth/current_user", (req, res) => {
    res.send(req.user);
  });
};
