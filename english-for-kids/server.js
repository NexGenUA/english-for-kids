const http = require('http');
const fs = require('fs');
const mime = require('mime');

const routes = new Set([
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
  '/repeat'
]);
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {

  if (routes.has(req.url)) {
    res.setHeader('Content-Type', 'text/html');
    fs.ReadStream(__dirname + '/public/index.html').pipe(res);
  } else {
    fs.readFile('./public/' + req.url, err => {
      if (!err) {
        const mimeType = mime.getType(req.url) || 'text/plain';
        res.setHeader('Content-type', mimeType);
        fs.ReadStream(__dirname + '/public/' + req.url).pipe(res);
      } else {
        res.writeHead(404, 'Not Found');
        fs.ReadStream(__dirname + '/public/index.html').pipe(res);
      }
    });
  }
});

server.listen(PORT, () => console.log(`Node.js web server at port ${PORT} is running...`));