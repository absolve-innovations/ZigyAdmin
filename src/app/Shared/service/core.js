const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = ['https://d1y0pdr7kupgvx.cloudfront.net/'];

// Enable CORS for the specified origin
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Your other server routes and middleware go here

// Start the server
const port = 3000;
app.listen(port, () => {
 
});
