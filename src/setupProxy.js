const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://4e2c-150-107-191-75.ngrok-free.app',
            changeOrigin: true,
        })
    );
};
