const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000; // Use environment port if available

// Middleware to add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  next();
});

// Proxy endpoint
app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('No URL provided');
  }
  const options = {
    url: url,
    headers: {
      token: req.headers.token // Forward the token header
    }
  };
  // Make the request to the target server and pipe the response
  request(options).pipe(res);
});

// Start the server
app.listen(port, () => {
  console.log(`CORS proxy server running on port ${port}`);
});
