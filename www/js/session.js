var Session = (function() {
  var sessionId;
  var baseURL = window.location+"";

  function Session() {
    if (!(this instanceof Session)) {
      return new Session();
    }
  }

  Session.getSessionId = function() {
    return this.sessionId;
  }

  Session.setSessionId = function(s) {
    this.sessionId = s;
  }
  // Helper to get hash from end of URL or generate a random one.
  Session.getFirepad = function() {
    // can we use sessionId here instead of the url?

    // grab the url hash id
    var hash = window.location.hash.replace(/#/g, '');
    hash = hash.replace(/-/g, '');
    if (hash) {
      var ref = firebase.database().ref();
      ref = ref.child(hash);
      var link = ref.key;
      this.sessionId = link;
      Session.showSessionInfo(link);
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
  Session.newSession = function(close, click) {
    // create new session
    var ref = firebase.database().ref();
    ref = ref.push(); // generate unique location.
    baseURL = window.location+"";
    //strip out anything after #
    if (baseURL != null) {
      var n = baseURL.indexOf('#');
      baseURL = baseURL.substring(0, n != -1 ? n : baseURL.length);
    }
    else baseURL = "";
    window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
    var link = ref.key.replace(/-/g, '');
    // set the session id and update it in the UI
    this.sessionId = link;
    // if we are click, we assume there is already a codemirror on the page
    if (click && close) {
      var storage = window.localStorage;
      storage.setItem('session', this.sessionId);
      // reload the page and connect to the new session id
      window.location.reload(true);
    }
    else {
      Session.showSessionInfo(link);
      // if the editor needs to be created
      Codehort.createEditor(true);
      // connect to firepad firebase
      Codehort.connectFirepad();

      // hide the panel
      if (close) {
        if (this.sessionId != null && Codehort.getFirepadRef() != null) {
          Codehort.closePanel();
        }
        else {
          // give feedback this didn't connect
          document.getElementById("errorNewSession").innerHTML = "Sorry, can't connect.";
        }
      }
      else {
        if (this.sessionId != null && Codehort.getFirepadRef() != null) {
          // disable the new session button
          document.getElementById("newSessionSplashBtn").disabled = true;
          document.getElementById("previousSplashBtn").disabled = true;
          document.getElementById("joinSessionSplashBtn").disabled = true;
          // enable the finish button
          //document.getElementById("finishBtn").disabled = false;
          document.getElementById("successSplash").innerHTML = "Connected to Session ID: " + this.sessionId;
        }
      }
    }
  }

  // join session icon click
  Session.joinCode = function(close) {
    var sessionIdInput;
    if (close) {
      // grab the session id that they inputted
      var sessionIdInput = document.getElementById("sessionIdInput").value;
    }
    else {
      sessionIdInput = document.getElementById("sessionIdSplashInput").value;
    }
    if (checkSessionId(sessionIdInput)) {

      Session.joinSessionId(sessionIdInput, close);
      // hide the panel
      if (close) {
        if (this.sessionId != null && Codehort.getFirepadRef() != null) {
          Codehort.closePanel();
        }
        else {
          // give feedback this didn't connect
          document.getElementById("errorJoinSession").innerHTML = "Sorry, can't connect.";
        }
      }
      else {
        if (this.sessionId != null && Codehort.getFirepadRef() != null) {
          // disable the join session button
          document.getElementById("newSessionSplashBtn").disabled = true;
          document.getElementById("previousSplashBtn").disabled = true;
          document.getElementById("joinSessionSplashBtn").disabled = true;
          document.getElementById("sessionIdSplashInput").disabled = true;
          // enable the finish button
          //document.getElementById("finishBtn").disabled = false;
          document.getElementById("successSplash").innerHTML = "Connected to Session ID: " + this.sessionId;
        }
      }
    }
    else {
      // show error that session doesn't fufil
      document.getElementById("errorJoinSession").innerHTML = "Enter a Session ID with 18-19 alphanumeric digits.";
    }
  }

  Session.joinSessionId = function(session_id, click) {
    this.sessionId = session_id;
    var baseURL = window.location+"";
    //strip out anything after #
    if (baseURL != null) {
      var n = baseURL.indexOf('#');
      baseURL = baseURL.substring(0, n != -1 ? n : baseURL.length);
    }
    else baseURL = "";
    window.location.href = baseURL + '#-' + this.sessionId;

    var storage = window.localStorage;
    storage.setItem('session', this.sessionId);

    if (click && this.sessionId) {
      // two options Here, if you are connected to an instance already, we have to set the session id you want and reload page
        window.location.reload(true);
    }
    else {
      // option two is that you aren't connected to an instance so we can just connect firepad
      // connect to firepad firebase
      Codehort.connectFirepad();
    }
  }

  // show session info icon click
  Session.showSessionInfo = function(link) {
    // check to see if you have a session id or not and display
    if (this.sessionId != null && this.sessionId != '') {
      document.getElementById("haveSession").style.display="block";
      document.getElementById("noSession").style.display="none";
      document.getElementById("codehort-link").innerHTML = "Send your friend to <a href=\"http://codehort.appspot.com/\" target=\"_new\">http://codehort.appspot.com</a> to download codehort, and then tell them to use this secret code to join you."
      document.getElementById("codehort-display").innerHTML = link;
      document.getElementById("sessionIdFooter").innerHTML = "Connected to Session ID: " + link;
    }
    else {
      document.getElementById("noSession").style.display="block";
      document.getElementById("haveSession").style.display="none";
    }
  }

  Session.leaveSession = function() {
    // to leave we can set their session id to null and reload
    this.sessionId = "";
    var baseURL = window.location+"";
    //strip out anything after #
    if (baseURL != null) {
      var n = baseURL.indexOf('#');
      baseURL = baseURL.substring(0, n);
    }
    window.location.href = baseURL;
    var storage = window.localStorage;
    storage.setItem('session', this.sessionId);
    window.location.reload(true);
  }

  Session.copySessionId = function() {
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
    if (value.length != 18 && value.length != 19) {
      return false;
    }
    // Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
    return true;
  }
  return Session;
})();
