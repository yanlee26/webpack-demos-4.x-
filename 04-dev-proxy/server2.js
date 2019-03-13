const http = require('http')
http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'PUT,POST,DELETE',
    'Access-Control-Max-Age': '100',
  })
  res.end('Hello World\n');
}).listen(3000)


