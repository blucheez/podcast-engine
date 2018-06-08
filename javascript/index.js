const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  if (req.method === 'GET') {
    const path = url.parse(req.url).pathname.slice(1).replace(/%20/g, ' ')

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write("ayy lmao though");
    res.end();
  }
}).listen(port, function(){
  console.log('Server running at ${' + port + '}/');
});
