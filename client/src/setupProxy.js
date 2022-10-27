// --- setupProxy.js ---
// allows relative route usage of express routes (like /auth/google) within the react app
// creates a reference to the express app in a proxy within the react client
// browser can access the express app thru the react uri + express route
//   (i.e. localhost:3000/auth/google when express is running on localhost:5000)
// this is for security reasons?? eliminates cross-origin requests

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/auth", "/api"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
