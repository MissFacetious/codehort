var sessionId;

// Helper to get hash from end of URL or generate a random one.
function getFirepad() {
  // grab the url hash id
  var hash = window.location.hash.replace(/#/g, '');
  hash = hash.replace(/-/g, '');
  if (hash) {
    var ref = firebase.database().ref();
    ref = ref.child(hash);
    var link = ref.key;
    sessionId = link;
    showSessionInfo(link);
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
  } else {
    /*
    ref = ref.push(); // generate unique location.
    window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
    var link = ref.key.replace(/-/g, '');
    sessionId = link;
    showSessionInfo(link);
    */
    console.log("do not generate a unique location at this time.");
    // disable buttons we can't use
    //mobbingBtn
    //chatBtn
    //sessionInfoBtn
  }
  return ref;
}

// new session icon click
function newSession() {
  // create new session
  var ref = firebase.database().ref();
  ref = ref.push(); // generate unique location.
  window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
  var link = ref.key.replace(/-/g, '');
  sessionId = link;
  showSessionInfo(link);
  //firepadRef = getFirepad();
  createEditor();
  connectFirepad();
  closePanel();
  //window.location.href = baseURL;
}

// join session icon click
function joinCode() {
  var sessionIdInput = document.getElementById("sessionIdInput").value;
  window.location.href = baseURL + '#-' + sessionIdInput;
  // make sure we reload the url to join correcty
  //window.location.reload(true);
  connectFirepad();
  closePanel();
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
