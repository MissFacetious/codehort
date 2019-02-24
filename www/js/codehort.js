var codeMirror;
var firepad;
var firepadRef;
var baseURL = window.location+"";
var sessionId;
var username = ""; // will be set in getPref
var userId = Math.floor(Math.random() * 9999999999).toString(); // will be set when we authenticate

//strip out anything after #
if (baseURL != null) {
  var n = baseURL.indexOf('#');
  baseURL = baseURL.substring(0, n != -1 ? n : baseURL.length);
}
else baseURL = "";

function init() {

  // hide panels
  hidePanels();
  getPref();

    //// Initialize Firebase.
  var config = {
    apiKey: "AIzaSyCa3PLDxHQ8Fz0Gyz8-aL-Ep6WhjSgKdRc",
    authDomain: "codehort.firebaseapp.com",
    databaseURL: "https://codehort.firebaseio.com",
    projectId: "codehort",
    storageBucket: "codehort.appspot.com",
    messagingSenderId: "323980550600"
  };
  firebase.initializeApp(config);
  //// Get Firebase Database reference.
  firepadRef = getExampleRef();
  //// Create CodeMirror (with line numbers and the JavaScript mode).
  codeMirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript'
  });

  // Get a reference to the Firebase Realtime Database
  var chatRef = firebase.database().ref();
  // Create an instance of Firechat
  var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

  // Listen for authentication state changes
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // If the user is logged in, set them as the Firechat user
          console.log(user);
          console.log("username " + username);
          if (username == "") console.log("username is empty");
          chat.setUser(user.uid, username);

          console.log("user id: " + user.uid);
          // if user is first, set the chatroom name to the session id and create room
          console.log("Creating chatroom...");
          //chat.createRoom("myRoom", "public", function(roomId) {

            //console.log("Success! ID: " + roomId);
          // if user is not first, join the chatroom name session id
            //chat.enterRoom(roomId);
          //});
        //});
    } else {
      // If the user is not logged in, sign them in anonymously
      firebase.auth().signInAnonymously().catch(function(error) {
        console.log("Error signing user in anonymously:", error);
      });
    }
  });

  //// Create Firepad.
  firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    defaultText: '// Welcome to Codehort, start coding!\n\nconsole.log(\'hello codehort!\');\n\n',
    userId: userId
  });

  //// Create FirepadUserList (with our desired userId).
  // problem where all of these users ends up with different name
  var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
  document.getElementById('userlist'), userId, username);

  var firepadUser = FirepadUserList.fromDiv(firepadRef.child('users'),
  document.getElementById('user'), userId, username);

  var firepadUserListDisabled = FirepadUserList.fromDiv(firepadRef.child('users'),
  document.getElementById('userlistdisabled'), userId, username);

  updateMobbing();
  changePercent(0);
}

// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
  var ref = firebase.database().ref();
  var hash = window.location.hash.replace(/#/g, '');
  hash = hash.replace(/-/g, '');
  if (hash) {
    ref = ref.child(hash);
    var link = ref.key;
    sessionId = link;
    showSessionInfo(link);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = baseURL + '#' + ref.key; // add it as a hash to the URL.
    var link = ref.key.replace(/-/g, '');
    sessionId = link;
    showSessionInfo(link);
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }
  return ref;
}

function hidePanels() {
  document.getElementById("codehort-neweditor").style.display = 'none';
  document.getElementById("codehort-saveedit").style.display = 'none';
  document.getElementById("codehort-newsession").style.display = 'none';
  document.getElementById("codehort-joinsession").style.display = 'none';
  document.getElementById("codehort-sessioninfo").style.display = 'none';
  document.getElementById("codehort-timer").style.display = 'none';
  document.getElementById("codehort-preferences").style.display = 'none';
  document.getElementById("codehort-run").style.display = 'none';
  document.getElementById("overlay").style.display = 'none';
}

function hideChat() {
  document.getElementById("codehort-chat").style.display = 'none';
}

function showPanel(panel) {
  document.getElementById(panel).style.display = 'block';
  if (panel != 'codehort-chat') {
    document.getElementById("overlay").style.display = 'block';
  }
}

function closePanel() {
    hidePanels();
}

// new editor icon click
function newEditor() {
  // remove all text in the editor
  firepad.setText('');
  hidePanels();
  updateMobbing();
}

// save editor icon click
function saveEditor() {
  var filename = document.getElementById("fileInput").value;
  var blob = new Blob([firepad.getText()], {
    type: "text/plain;charset=utf-8;",
  });
  window.saveAs(blob, filename);
  closePanel();
}



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

function changeQuantity(input, amount) {
  var value = document.getElementById(input).value;
  if (value > 0 && amount < 0) {
    value--;
  }
  if (amount > 0) {
    value++;
  }
  document.getElementById(input).value = value;
  updateMobbing();
}

function updateMobbing() {
  var code = document.getElementById('timer').value;
  var thenbreak = document.getElementById('break').value;
  var every = document.getElementById('every').value;
  var sentence = "You will code for " + code + " minutes each, take a " + thenbreak + " minute break every "+ every + " coding ";
  if (every > 1) {
    sentence += "sessions.";
  }
  else {
    sentence += "session.";
  }
  if (every == 0 || thenbreak == 0) {
    sentence = "You will code for " + code + " minutes each, no breaks!";
  }
  document.getElementById("sentence").innerHTML = sentence;
  if (every > 1) {
    document.getElementById("plural").innerHTML = "s";
  }
  else {
    document.getElementById("plural").innerHTML = "";
  }
}

function getPref() {
  var storage = window.localStorage;
  var userNameInput = document.getElementById("usernameInput");
  var userNamePref = storage.getItem('username');
  if (userNamePref == null || userNamePref == '') {
    if (username == "") username = "User"+userId.substring(userId.length-4, 3);
    userNamePref = username;
  }
  userNameInput.value = userNamePref;
  username = userNamePref;

  var zoomPref = storage.getItem('zoom');
  if (zoomPref == null || zoomPref == '') {
    zoom = 1.5; // default
  }
  else {
    zoom = zoomPref;
    document.getElementById('zoom').value = Math.round(100 * zoom);
  }
  resize();
}

// preferences icon click
function applyPref() {
  var storage = window.localStorage;
  // apply the prefs in the panel such as
  var userNameInput = document.getElementById("usernameInput").value;
  //var value = storage.getItem('username'); // Pass a key name to get its value.
  storage.setItem('username', userNameInput); // Pass a key name and its value to add or update that key.

  // dark / light theme

  // show intro at startup

  // display chat

  // zoom
  changePercent(0);
  storage.setItem('zoom', zoom);

  hidePanels();
  window.location.reload(true);
}

// run code icon click
function executeCode() {
  //console.log(codeMirror.getValue(""));
  //var newWindow = window.open();
  //newWindow.document.write('<script>function init() { alert("hello"); eval(codeMirror.getValue("")) }');
  //newWindow.document.write('<body onload="init()">');
  console.log(firepad.getText());

  eval(firepad.getText());
}
