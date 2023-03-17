const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/notification',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      secure: false,
    })
  );

  app.use(
    '/notification/:email',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      secure: false,
    })
  );
};