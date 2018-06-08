// framework for handling http interactions
var app = require("express")();

// get rid of the /javascript
var path = __dirname.substring(0, __dirname.length - 10);

// port used for heroku app
var port = process.env.PORT || 3000;

// allow us to parse form data
app.use(require("express-formidable")());

app.get("/", function(req, res) {
  res.sendFile(path + "/html/index.html");
});

app.get("/image", function(req, res) {
  res.sendFile(path + "/hpton.jpg");
});

app.post("/data", function(req, res) {
  console.log(req.fields);
  res.send(req.fields);
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
