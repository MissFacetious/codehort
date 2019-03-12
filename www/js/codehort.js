var firepad;
var firepadRef;
var codeMirror;
var baseURL = window.location+"";
var username = ""; // will be set in getPref
var userId = Math.floor(Math.random() * 9999999999).toString(); // will be set when we authenticate

//// Initialize Firebase.
var config = {
  apiKey: "AIzaSyCa3PLDxHQ8Fz0Gyz8-aL-Ep6WhjSgKdRc",
  authDomain: "codehort.firebaseapp.com",
  databaseURL: "https://codehort.firebaseio.com",
  projectId: "codehort",
  storageBucket: "codehort.appspot.com",
  messagingSenderId: "323980550600"
};

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

  firebase.initializeApp(config);

  if (splashScreen) {
    // show the first splash screen before we begin
    display(0);
    showPanel("codehort-splash");
  }
  createEditor(false);
}

function createEditor(click) {
  //// Create CodeMirror (with line numbers and the JavaScript mode).

  if (firebase != null) {
    // clear out the CodeMirror instance
    // newEditor();// this just wipes everything out... sad.

  }
  if (codeMirror == null) {
    codeMirror = CodeMirror(document.getElementById('firepad-container'), {
      lineNumbers: true,
      mode: 'javascript'
    });
  }
  updateMobbing();
  changePercent(0);

  // if you have connected to a previous session try to connect now?
  if (sessionId && !splashScreen && !click) {
    // attempt to connect to this session id
    console.log(sessionId);
    joinSessionId(sessionId, false);
  }
}

function connectFirepad() {
  //// Get Firebase Database reference.
  if (firepadRef == null) {
    firepadRef = getFirepad();
    console.log("new firepad");
  }

  if (firepadRef != null) {
    // Get a reference to the Firebase Realtime Database
    var chatRef = firebase.database().ref();
    // Create an instance of Firechat
    var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));
    // Listen for authentication state changes
    //firebase.auth().signInAnonymously().catch(function(error) {
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
    //}
    //// Create FirepadUserList (with our desired userId).
    // problem where all of these users ends up with different name
    var firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
    document.getElementById('userlist'), userId, username);

    var firepadUser = FirepadUserList.fromDiv(firepadRef.child('users'),
    document.getElementById('user'), userId, username);

    var firepadUserListDisabled = FirepadUserList.fromDiv(firepadRef.child('users'),
    document.getElementById('userlistdisabled'), userId, username);
  }
}

function hidePanels() {
  document.getElementById("codehort-splash").style.display = 'none';
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
    var outnode = document.getElementById("outputCode");
    outnode.innerHTML = "";
    hidePanels();
}
