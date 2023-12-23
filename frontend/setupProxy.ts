const { createProxyMiddleware } = require('http-proxy-middleware'); 

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URI || 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};