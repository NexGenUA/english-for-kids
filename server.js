const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const routes = [
  '/',
  '/action-a',
  '/action-b',
  '/outdoors',
  '/house',
  '/animal-a',
  '/animal-b',
  '/clothes',
  '/emotion',
  '/stats',
  '/repeat',
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  if (!routes.some(route => {
    const set = new Set(req.url.split(/\?/));
    return set.has(route);
  })) {
    res.status(404);
  }
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Node.js web server at address http://localhost:${PORT} is running...`);
});
