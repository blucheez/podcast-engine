// framework for handling http interactions
var app = require("express")();
// used to make requests to the gpodder API
var request = require("request");

// path to directory of the app (wheras dirname goes to index.js)
var path = __dirname;

// port used for heroku app
var port = process.env.PORT || 3000;

// some modifications that make express more powerful
// allow us to parse form data
app.use(require("express-formidable")());
// allow us to store session data
app.use(require("express-session")({secret: "why does this exist"}));
// allow free access to the public files
app.use(require("express").static("public"));

// the default directory goes straight to home page
app.get("/", function(req, res) {
  res.sendFile(path + "/public/html/home.html");
});

app.post("/login", function(req, res) {
  req.session.username = req.fields.username;
  req.session.password = req.fields.password;
  console.log("Logged in " + req.session.username);

  // send the object that we get from the API
  res.send(gpodderRequest(req.session.username, req.session.password));
});

// return username on request
app.post("/getUserName", function(req, res) {
  res.send(req.session.username);
});

// start the server
app.listen(port, function() {
  console.log("Listening on " + port);
});

// function to get data from username and password
function gpodderRequest(username, password) {
  return "DEFAULT REQUEST";
}
