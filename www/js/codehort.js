function init() {
  // hide panels
  Codehort.hidePanels();
  Preferences.getPref();
  loadTheme();

  firebase.initializeApp(config);

  if (Preferences.getSplashScreen()) {
    // show the first splash screen before we begin
    Splash.display(0);
    Codehort.showPanel("codehort-splash");
  }
  Codehort.createEditor(false);
  Mobbing.timerFunction();
}

var Codehort = (function() {

  var firepad;
  var firepadRef;
  var codeMirror;
  var username = ""; // will be set in getPref
  var userId = Math.floor(Math.random() * 9999999999).toString(); // will be set when we authenticate
  var firepadUserList;

  function Codehort() {
    if (!(this instanceof Codehort)) {
      return new Codehort();
    }
  }

  Codehort.setUsername = function(u) {
    this.username = u;
  }

  Codehort.getUsername = function() {
    return this.username;
  }

  Codehort.getUserId = function() {
    return this.userId;
  }

  Codehort.setUserId = function(u) {
    this.userId = u;
  }

  Codehort.getCodeMirror = function() {
    return codeMirror;
  }

  Codehort.getCodeMirrorValue = function() {
    return codeMirror.getValue();
  }

  Codehort.getFirepad = function() {
    return firepad;
  }

  Codehort.setFirepad = function(f) {
    firepad.setText(f);
  }

  Codehort.getFirepadRef = function(f) {
    return firepadRef;
  }

  Codehort.createEditor = function(click) {
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
    Mobbing.updateMobbing();
    Zoom.changePercent(0);

    // if you have connected to a previous session try to connect now?
    if (Session.getSessionId() && !Preferences.getSplashScreen() && !click) {
      // attempt to connect to this session id
      //console.log(sessionId);
      Session.joinSessionId(Session.getSessionId(), false);
    }
  }

  Codehort.connectFirepad = function() {
    //// Get Firebase Database reference.
    if (firepadRef == null) {
      firepadRef = Session.getFirepad();
    }

    if (firepadRef != null) {
      // Get a reference to the Firebase Realtime Database
      //// Create Firepad.
      firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        defaultText: '// Welcome to Codehort, start coding!\n\nconsole.log(\'hello codehort!\');\n\n',
        userId: userId
      });

      //// Create FirepadUserList (with our desired userId).
      // problem where all of these users ends up with different name
      var userListRef = firepadRef.child('users');

      firepadUserList = FirepadUserList.fromDiv(userListRef,
      document.getElementById('userlist'), this.userId, this.username);

      var firepadUser = FirepadUserList.fromDiv(userListRef,
      document.getElementById('user'), this.userId, this.username);

      var firepadUserListDisabled = FirepadUserList.fromDiv(userListRef,
      document.getElementById('userlistdisabled'), this.userId, this.username);

      // kick off a function to wait a little then show how many usersDom
      showNumberUsers(); // this doesn't take into effect real time changes
    }
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  showNumberUsers = async () => {
    await delay(3000);
    var users = Codehort.getCurrentUsers();
    if (users.length > 0) {
      document.getElementById("sessionUsersFooter").innerHTML = "Users connected: " + users.length;
    }
    else {
      document.getElementById("sessionUsersFooter").innerHTML = "";
    }
  };

  Codehort.getCurrentUsers = function() {
    var users = [];
    var usersDom = firepadUserList.userList_.children[1];
    var main = usersDom.lastChild;
    for (var i=0; i < main.childNodes.length; i++) {
      var name = main.childNodes[i].lastChild.innerHTML;
      users.push(name);
    }
    users.sort();
    return users;
  }

  Codehort.hidePanels = function() {
    document.getElementById("codehort-splash").style.display = 'none';
    document.getElementById("codehort-neweditor").style.display = 'none';
    document.getElementById("codehort-saveedit").style.display = 'none';
    document.getElementById("codehort-newsession").style.display = 'none';
    document.getElementById("codehort-joinsession").style.display = 'none';
    document.getElementById("codehort-sessioninfo").style.display = 'none';
    document.getElementById("codehort-timer").style.display = 'none';
    document.getElementById("codehort-preferences").style.display = 'none';
    document.getElementById("codehort-run").style.display = 'none';
    document.getElementById("codehort-continue-mob").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
  }

  Codehort.hideChallenge = function() {
    document.getElementById("codehort-challenge").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
  }

  Codehort.showPanel = function(panel) {
    document.getElementById(panel).style.display = 'block';
    if (panel == 'codehort-challenge') {
      Editor.getChallengeFromEditor();
    }
    else {
      document.getElementById("overlay").style.display = 'block';
    }
  }

  Codehort.closePanel = function() {
    var outnode = document.getElementById("outputCode");
    outnode.innerHTML = "";
    Codehort.hidePanels();
  }

  Codehort.help = function() {
    window.open(
      'help.html',
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  return Codehort;
})();
