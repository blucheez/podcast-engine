// framework for handling http interactions
var app = require("express")();
// used to make requests to the gpodder API
var request = require("request");
// used to parse form data
var bodyParser = require("body-parser");

// path to directory of the app (wheras dirname goes to index.js)
var path = __dirname;

// port used for heroku app
var port = process.env.PORT || 3000;

// some modifications that make express more powerful
// allow app to understand url requests and posts
app.use(bodyParser.urlencoded({
    extended: true
}));
// allow us to parse form data
app.use(require("body-parser").json());
// allow us to store session data
app.use(require("express-session")({secret: "why does this exist"}));
// allow free access to the public files
app.use(require("express").static("public"));

// the default directory goes straight to home page
app.get("/", function(req, res) {
  res.sendFile(path + "/public/html/home.html");
});

// file redirections
app.get("/home", function(req, res) {
  res.sendFile(path + "/public/html/home.html");
});
app.get("/subs", function(req, res) {
  res.sendFile(path + "/public/html/subs.html");
});

app.post("/login", function(req, res) {
  req.session.username = req.body.username;
  req.session.password = req.body.password;
  console.log("Logged in " + req.session.username);

  res.sendFile(path + "/public/html/home.html");
});

app.post("/logout", function(req, res) {
  console.log("Logged out " + req.session.username);
  req.session.username = "";
  req.session.password = "";

  res.sendFile(path + "/public/html/home.html");
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
