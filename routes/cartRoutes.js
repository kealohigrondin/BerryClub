const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  /**
   * get a user's cart
   */
  app.get("/api/cart", requireLogin, (req, res) => {});
  /**
   * add list of items to user's cart (1 < items.length < n)
   * input: [String] of items to add
   */
  app.post("/api/cart/add", requireLogin, (req, res) => {});
  /**
   * remove list of items from user's cart
   * input: [String] of items
   */
  app.post("/api/cart/remove", (req, res) => {});
};
