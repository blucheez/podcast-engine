// framework for handling http interactions
var app = require("express")();

// port used for heroku app
var port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/image", function(req, res) {
  res.sendFile(__dirname + "/hpton.jpg");
});

app.listen(port, function() {
  console.log("Listening on " + port);
});
