
var loggedIn = false;
$(document).ready(function() {
  console.log("loaded home.js");

  M.AutoInit();

  $.post("/getUserName", function(data) {
    if(data != "") {
      loggedIn = true;
      alert("logged in");
      $("#username").html(data);
    } else {
      loggedIn = false;
      alert("not logged in");
    }
  });

});

function look() {
  var query = $("#query").val();

  $("#results").empty();
  var str = "Searching for " + query + "...";

  $.get("https://gpodder.net/search.json?q=" + query, function(data) {
    console.log(data);
    if(data.length > 0) {
      str = "Found " + data.length + " results for " + query;
    } else {
      str = "No results found for " + query;
    }
    $("#reporter").html(str);

    for(var i = 0; i < data.length; i++) {
      createCard(data[i].logo_url, data[i].title, data[i].description);
    }
  });

  $("#reporter").html(str);
}

function createCard(image, title, description) {
  var area = document.createElement("div");
  $(area).addClass("col s12 m6 l3");

  var card = document.createElement("div");
  $(card).addClass("card medium");

  $(card).append("<div class'card-image'><img class='responsive-img' src='" + image +"'></div>");

  var content = document.createElement("div");
  $(content).addClass("card-content");
  $(content).append("<span class='activator card-title'>" + title + "</span>");
  $(card).append(content);

  var hidden = document.createElement("div");
  $(hidden).addClass("card-reveal");
  $(hidden).append("<span class='card-title'>" + title + "</span>");
  $(hidden).append("<p>" + description + "</p>");
  $(card).append(hidden);


  $(area).append(card);
  $("#results").append(area);
}
