const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/catalog",
    proxy.createProxyMiddleware({
      target: "http://localhost:3005",
      changeOrigin: true
    })
  );
};