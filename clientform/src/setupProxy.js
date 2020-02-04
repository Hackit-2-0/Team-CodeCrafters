const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/Image",
    proxy({
      target: "http://localhost:5000/Image",
      changeOrigin: true
    })
  );
  app.use(
    "/Data",
    proxy({
      target: "http://localhost:5000/Data",
      changeOrigin: true
    })
  );
  app.use(
    "/app",
    proxy({
      target: "http://127.0.0.1:8000",
      changeOrigin: true
    })
  );
};
