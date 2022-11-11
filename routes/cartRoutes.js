const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Cart = mongoose.model("cart");

module.exports = (app) => {
  /**
   * get a user's cart
   * input: none
   * output: user's cart
   */
  app.get("/api/cart", requireLogin, async (req, res) => {
    const cart = await Cart.findOne({ _user: req.user._id });
    res.send(cart);
  });

  /**
   * add list of items to user's cart (1 < items.length < n)
   * input: [Item] of items to add
   * output: updated cart
   */
  app.post("/api/cart", requireLogin, async (req, res) => {
    let newCart = {};
    //update existing items
    req.body.forEach(async ({ name, quantity, unit }) => {
      let cart = await Cart.findOneAndUpdate(
        { _user: req.user._id }, //find a cart matching _user === req.user._id
        {
          $inc: { "items.$[element].quantity": quantity },
          $set: { "items.$[element].unit": unit },
        }, //$inc (increment) the element's quantity by quantity
        { arrayFilters: [{ "element.name": name.toUpperCase() }], upsert: true } //where element.name === name, if it doesn't match, then upsert into items
      );
      //if it wasn't added in the update step, add it now
      if (!cart.items.some((el) => el.name === name)) {
        cart.items.push({ name: name.toUpperCase(), quantity, unit });
        cart = await cart.save();
      }
      newCart = cart;
    });
    res.send(newCart);
  });

  /**
   * remove items from user's cart
   * input: String of item's name
   * output: updated cart after removing item
   */
  app.post("/api/cart/remove", async (req, res) => {
    const cart = await Cart.findOneAndUpdate(
      { _user: req.user._id },
      { $pull: { items: { name: req.body.data } } }, //pulls out items matching name === req.body.data
      { new: true } //required to return updated cart to 'cart' variable
    );
    console.log(cart);
    res.send(cart);
  });
};
