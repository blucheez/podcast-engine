// boolean that checks whether the user is logged in or not
var loggedIn = false;


$(document).ready(function() {
  // initialize all javascript code for Materialze
  M.AutoInit();

  // try logging in
  $.post("/getUserName", function(data) {
    if(data != "") {
      loggedIn = true;
      console.log(data);
      $("#username").html(data);
    } else {
      loggedIn = false;
    }
  });

  // load the top 50 podcasts into the 'results' section
  $.get("https://gpodder.net/toplist/50.json", function(data) {
    for(var i = 0; i < data.length; i++) {
      createCard(data[i].logo_url, data[i].title, data[i].description,
        data[i].url, data[i].subscribers);
    }
  });
});

// function that searches and creates cards based on the query
// called once the search is submitted
function look() {
  var query = $("#query").val();

  $("#results").empty();
  var str = "Searching for " + query + "...";
  if(query.length != 0) {
    $.get("https://gpodder.net/search.json?q=" + query, function(data) {
      console.log(data);
      if(data.length > 0) {
        str = "Found " + data.length + " results for " + query;
      } else {
        str = "No results found for " + query;
      }
      $("#reporter").html(str);

      for(var i = 0; i < data.length; i++) {
        createCard(data[i].logo_url, data[i].title, data[i].description,
          data[i].url, data[i].subscribers);
      }
    });
  } else {
    $.get("https://gpodder.net/toplist/50.json", function(data) {
      for(var i = 0; i < data.length; i++) {
        createCard(data[i].logo_url, data[i].title, data[i].description,
          data[i].url, data[i].subscribers);
        $("#reporter").html("Top 50 Podcasts");
      }
    });
  }

  $("#reporter").html(str);
}
