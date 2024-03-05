const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req, res);

  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  })

  req.on('end', () => {
    console.log(body);
    res.writeHead(200, {'Content-Type': 'text/plain'} )
    res.end('<h1>Hello</h1>')

  })


})

server.listen(3003);


// server.close();
