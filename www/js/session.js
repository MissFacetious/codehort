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
    //infoSessionBtn
  }
  return ref;
}

// new session icon click
function newSession(close, click) {
  // create new session
  var ref = firebase.database().ref();
  ref = ref.push(); // generate unique location.
  window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
  var link = ref.key.replace(/-/g, '');
  // set the session id and update it in the UI
  sessionId = link;
  // if we are click, we assume there is already a codemirror on the page
  if (click && close) {
    var storage = window.localStorage;
    storage.setItem('session', sessionId);
    // reload the page and connect to the new session id
    window.location.reload(true);
  }
  else {
    showSessionInfo(link);
    // if the editor needs to be created
    createEditor(true);
    // connect to firepad firebase
    connectFirepad();

    // hide the panel
    if (close) {
      if (sessionId != null && firepadRef != null) {
        closePanel();
      }
      else {
        // give feedback this didn't connect
        document.getElementById("errorNewSession").innerHTML = "Sorry, can't connect.";
      }
    }
    else {
      if (sessionId != null && firepadRef != null) {
        // disable the new session button
        document.getElementById("newSessionSplashBtn").disabled = true;
        document.getElementById("previousSplashBtn").disabled = true;
        document.getElementById("joinSessionSplashBtn").disabled = true;
        // enable the finish button
        //document.getElementById("finishBtn").disabled = false;
        document.getElementById("successSplash").innerHTML = "Connected to Session ID: " + sessionId;
      }
    }
  }
}

// join session icon click
function joinCode(close) {
  var sessionIdInput;
  if (close) {
    // grab the session id that they inputted
    var sessionIdInput = document.getElementById("sessionIdInput").value;
  }
  else {
    sessionIdInput = document.getElementById("sessionIdSplashInput").value;
  }
  if (checkSessionId(sessionIdInput)) {

    joinSessionId(sessionIdInput, close);
    // hide the panel
    if (close) {
      if (sessionId != null && firepadRef != null) {
        closePanel();
      }
      else {
        // give feedback this didn't connect
        document.getElementById("errorJoinSession").innerHTML = "Sorry, can't connect.";
      }
    }
    else {
      if (sessionId != null && firepadRef != null) {
        // disable the join session button
        document.getElementById("newSessionSplashBtn").disabled = true;
        document.getElementById("previousSplashBtn").disabled = true;
        document.getElementById("joinSessionSplashBtn").disabled = true;
        document.getElementById("sessionIdSplashInput").disabled = true;
        // enable the finish button
        //document.getElementById("finishBtn").disabled = false;
        document.getElementById("successSplash").innerHTML = "Connected to Session ID: " + sessionId;
      }
    }
  }
  else {
    // show error that session doesn't fufil
    document.getElementById("errorJoinSession").innerHTML = "Enter a Session ID with 19 alphanumeric digits.";
  }
}

function joinSessionId(session_id, click) {
  sessionId = session_id;
  window.location.href = baseURL + '#-' + sessionId;

  var storage = window.localStorage;
  storage.setItem('session', sessionId);

  if (click && sessionId) {
    // two options Here, if you are connected to an instance already, we have to set the session id you want and reload page
      window.location.reload(true);
  }
  else {
    // option two is that you aren't connected to an instance so we can just connect firepad
    // connect to firepad firebase
    connectFirepad();
  }
}

// show session info icon click
function showSessionInfo(link) {
  document.getElementById("codehort-link").innerHTML = "Send your friend to <a href=\"http://codehort.appspot.com/\" target=\"_new\">http://codehort.appspot.com</a> to download codehort, and then tell them to use this secret code to join you."
  document.getElementById("codehort-display").innerHTML = link;
  document.getElementById("sessionIdFooter").innerHTML = "Connected to Session ID: " + link;
}

function copySessionId() {
  var range = document.createRange();
  var sessionIdDisplay = document.getElementById("codehort-display");
  range.selectNode(sessionIdDisplay);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
}

function checkSessionId(value) {
  console.log(value.length);
  if (value.includes(".") || value.includes("#") || value.includes("$") || value.includes("[") || value.includes("]")) {
    return false;
  }
  if (value.length != 19) {
    return false;
  }
  // Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
  return true;
}
