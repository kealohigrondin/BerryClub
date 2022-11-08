const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Cart = mongoose.model("cart");

module.exports = (app) => {
  /**
   * get a user's cart
   */
  app.get("/api/cart", requireLogin, async (req, res) => {
    const existingCart = await Cart.findOne({ _user: req.user._id });
    res.send(existingCart);
  });
  /**
   * add list of items to user's cart (1 < items.length < n)
   * input: [Item] of items to add
   */
  app.post("/api/cart", requireLogin, async (req, res) => {
    console.log(req.body);
    const existingCart = await Cart.findOne({ _user: req.user._id });
    if (existingCart) {
      //add items to existing cart
      res.send(existingCart);
    } else {
      //create new cart for user and add items
      const cart = new Cart({ _user: req.user._id, items: req.body });
      cart.save();
      res.send(cart);
    }
  });
  /**
   * remove list of items from user's cart
   * input: [String] of items
   */
  app.post("/api/cart/remove", (req, res) => {});
};
