const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port = 3000; // Choose a port that is not being used by your Angular app

// Enable CORS
app.use(cors());

// Set up the proxy middleware for PhonePe API
app.use('/phonepe-api', createProxyMiddleware({
  target: 'https://api.phonepe.com',
  changeOrigin: true,
  pathRewrite: {
    '^/phonepe-api': '/v3/payment', // Rewrite the path to remove the '/phonepe-api' prefix
  },
}));

// Start the server
app.listen(port, () => {

});
