// this file contains functions that simplify code in other files
// file assumes that Jquery and Materialize have already been added

// create a card with image, title, and description
function createCard(image, title, description, url, subscribers) {

  // area for the general card
  var area = document.createElement("div");
  $(area).addClass("col s12 m6 l3");

  // the card itself
  var card = document.createElement("div");
  $(card).addClass("card medium");

  // add an image to the card
  var str = 'displayPopup("' + url + '")';
  $(card).append("<div class'card-image'><img onclick=" + str + " class='responsive-img' src='" + image +"'></div>");

  // the contents that are displayed normally
  var content = document.createElement("div");
  $(content).addClass("card-content");
  $(content).append("<div class='row'>");
    $(content).append("<span class='col s10 card-title'>" + title + "</span>");
    $(content).append("<i style='cursor: pointer;' class='col s2 activator material-icons'>arrow_drop_down</i>");
  $(content).append("</div>");
  $(card).append(content);

  // info that comes up on expansion
  var hidden = document.createElement("div");
  $(hidden).addClass("card-reveal");
  $(hidden).append("<span class='card-title'>" + title + "</span>");
  $(hidden).append("<p>" + description + "</p>");
  $(card).append(hidden);


  $(area).append(card);
  $("#results").append(area);
}

function displayPopup(url) {
  $("#popupContent").empty();

  // can't figure out how to get episodes for a podcast, so I'll just leave
  // a link to the podcast site on gpodder for now
  $.get("https://gpodder.net/api/2/data/podcast.json?url=" + url, function(data) {
    $("#popupContent").html("<a href ='" + data.mygpo_link + "'>Go to gpodder site</a>");
  });

  $("#popup").removeClass("hide");
}

function hidePopup() {
  $("#popup").addClass("hide");
}

function login() {
  $("#popupContent").empty();

  var form = `
  <form method="post" action="/logout">
    <input type = "submit" value = "Logout"/>\
  </form>
  `
  if(!loggedIn) {
    form = `
    <form method="post" action="/login">
      Username: <input name = "username" type = "text" />
      Password: <input name = "password" type = "password" />
      <input type = "submit" value = "Submit"/>\
    </form>
    `;
  }
  $("#popupContent").append(form);

  $("#popup").removeClass("hide");
}
