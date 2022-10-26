//keys.js - figure out what set of credentials to use based on environment
if (process.env.NODE_ENV === "production") {
  //return prod set of keys
  module.exports = require("./prod.js");
} else {
  //return dev set of keys
  module.exports = require("./dev.js");
}
