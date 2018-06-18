// boolean that checks whether the user is logged in or not
var loggedIn = false;


$(document).ready(function() {
  // initialize all javascript code for Materialze
  M.AutoInit();

  // try logging in
  $.post("/getUserName", function(name) {
    if(name != "") {
      loggedIn = true;
      $("#username").html(name);

      // load the subscribed podcasts
      $.get("https://gpodder.net/subscriptions/" + name + ".json", function(data) {
        for(var i = 0; i < data.length; i++) {
          createCard(data[i].logo_url, data[i].title, data[i].description,
            data[i].url, data[i].subscribers);
        }
      });

    } else {
      loggedIn = false;
    }
  });


});
