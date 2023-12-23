const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://g09-4pmqwb63a-matteopossamai.vercel.app',
      changeOrigin: true,
    })
  );
};
