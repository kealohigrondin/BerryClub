const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Cart = mongoose.model("cart");

module.exports = (app) => {
  /**
   * get a user's cart
   */
  app.get("/api/cart", requireLogin, async (req, res) => {
    const cart = await Cart.findOne({ _user: req.user._id });
    res.send(cart);
  });
  /**
   * add list of items to user's cart (1 < items.length < n)
   * input: [Item] of items to add
   */
  app.post("/api/cart", requireLogin, async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
      { _user: req.user._id },
      { items: req.body },
      { upsert: true, new: true }
    );
    console.log(cart);
    res.send(cart);
  });
  /**
   * remove list of items from user's cart
   * input: [String] of items
   */
  app.post("/api/cart/remove", (req, res) => {});
};
