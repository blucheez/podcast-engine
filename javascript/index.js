console.log("The index is responding");

var http = require("http");

try {
  http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write("Hello World");
    response.end();
  }).listen(80);
} catch (e) {
  console.log(e);
}
