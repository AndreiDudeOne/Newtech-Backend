const http = require('http');
const PORT = 3002

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  let contentType = 'text/html';
  // Returnare fisiere html, script si style

  // Sa adaugam cache la script si style

})
server.listen(PORT);
console.log(`Server started on port: ${PORT}`)
// server.close();
