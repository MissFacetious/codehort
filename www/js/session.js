var sessionId;

// new session icon click
function newSession() {
  // create new session
  window.location.href = baseURL;
  firepadRef = getExampleRef();
}

// join session icon click
function joinCode() {
  var sessionIdInput = document.getElementById("sessionIdInput").value;
  window.location.href = baseURL + '#-' + sessionIdInput;
  // make sure we reload the url to join correcty
  window.location.reload(true);
}

// show session info icon click
function showSessionInfo(link) {
  document.getElementById("codehort-link").innerHTML = "Send your friend to <a href=\"http://codehort.appspot.com/\" target=\"_new\">http://codehort.appspot.com</a> to download codehort, and then tell them to use this secret code to join you."
  document.getElementById("codehort-display").innerHTML = link;
  document.getElementById("sessionIdFooter").innerHTML = "Connected to session id: " + link;
}

function copySessionId() {
  var range = document.createRange();
  var sessionIdDisplay = document.getElementById("codehort-display");
  range.selectNode(sessionIdDisplay);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  //sessionId.select();
  document.execCommand("copy");

  console.log("Copied the text: " + sessionIdDisplay.innerHTML);
}
