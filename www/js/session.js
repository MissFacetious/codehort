var sessionId;

// Helper to get hash from end of URL or generate a random one.
function getFirepad() {
  // can we use sessionId here instead of the url?

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
    console.log("do not generate a unique location at this time.");
    // disable buttons we can't use
    //mobBtn
    //chatBtn
    //infoSessionBtn
  }
  return ref;
}

// new session icon click
function newSession(close) {
  // create new session
  var ref = firebase.database().ref();
  ref = ref.push(); // generate unique location.
  window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
  var link = ref.key.replace(/-/g, '');
  // set the session id and update it in the UI
  sessionId = link;
  showSessionInfo(link);
  // if the editor needs to be created
  createEditor();
  // connect to firepad firebase
  connectFirepad();
  // hide the panel
  if (close) {
    closePanel();
  }
  else {
    if (sessionId != null && firepadRef != null) {
      // disable the new session button
      document.getElementById("newSessionSplashBtn").disabled = true;
      document.getElementById("previousSplashBtn").disabled = true;
      document.getElementById("joinSessionSplashBtn").disabled = true;
      // enable the finish button
      document.getElementById("finishBtn").disabled = false;
    }
  }
}

// join session icon click
function joinCode(close) {
  // grab the session id that they inputted
  var sessionIdInput = document.getElementById("sessionIdInput").value;
  window.location.href = baseURL + '#-' + sessionIdInput;
  // if the editor needs to be created
  //createEditor();
  // connec to firepad firebase
  connectFirepad();
  // hide the panel
  if (close) {
    closePanel();
  }
  else {
    if (sessionId != null && firepadRef != null) {
      // disable the join session button
      document.getElementById("newSessionSplashBtn").disabled = true;
      document.getElementById("previousSplashBtn").disabled = true;
      document.getElementById("joinSessionSplashBtn").disabled = true;
      // enable the finish button
      document.getElementById("finishBtn").disabled = false;
    }
  }
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
  document.execCommand("copy");
}
