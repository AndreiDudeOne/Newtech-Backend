const http = require('http');
const PORT = 3001

const server = http.createServer((req, res) => {
  let body = '';
  let message = 'No name provided';

  const baseURL = 'http://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);


  // Url params playgorund
  const params = reqUrl.searchParams;
  const nameParam = params.get('name');
  const age = params.get('age');
  const language = params.get('language');

  if (nameParam) {
    message = `${nameParam} is ${age ?? 'no age'} years old and likes programming in ${language ?? 'no language'}`;
  }

  // Body playground
  req.on('data', (chunk) => {
    // In case you add data to the body
    body += chunk;
  })

  req.on('end', () => {
    const dataBody = JSON.parse(body);
    const { surname } = dataBody;
    
    console.log(surname);

    res.writeHead(200, {'Content-Type': 'text/html'} )
    res.end(`<h1>${message}</h1>`)

  })

})
server.listen(PORT);
console.log(`Server started on port: ${PORT}`)
// server.close();
