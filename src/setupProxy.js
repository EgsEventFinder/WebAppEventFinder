const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

module.exports = function(app) {
  // Add the cors middleware
  app.use(cors());
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
    '/group',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /group');
      },
    })
  );

  app.use(
    '/groupnotification',
    createProxyMiddleware({
      target: 'http://localhost:3003',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /groupnotification');
      },
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

  app.use(
    '/logout',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /logout called');
      },
    })
  );

  app.use(
    '/ticket',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /auth/verifyToken called');
      },
    })
  );
  app.use(
    '/success',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /success called');
      },
    })
  );
  app.use(
    '/cancel',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq) => {
        console.log('proxy middleware for /cancel called');
      },
    })
  );

  app.use(
    '/events',
    createProxyMiddleware({
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      secure: false,
    })
  );

  
  
  app.use(
    '/c/pay',
    createProxyMiddleware({
      target: 'https://checkout.stripe.com',
      changeOrigin: true,
      secure: false,
    })
  );
  
};