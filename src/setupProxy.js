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
  
  app.use(
    '/verifyToken',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /auth/verifyToken called');
      },
    })
  );
  
};