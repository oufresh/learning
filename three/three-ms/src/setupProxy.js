const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/three-ms-app',
    createProxyMiddleware({
      target: 'http://localhost:3002',
      changeOrigin: true,
      pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/three-ms-app': '/', // remove base path
      },
    })
  );
};