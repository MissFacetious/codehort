function init() {
  // hide panels
  Codehort.hidePanels(); // hide all panels at start - should be hidden already from default css
  Preferences.getPref(); // load preferences from storage
  loadTheme(); // light or dark theme change

  firebase.initializeApp(config);

  // if this is our first time here or we have our splash screen wizard option true
  if (Preferences.getSplashScreen()) {
    // show the first splash screen before we begin
    Splash.display(0);
    Codehort.showPanel("codehort-splash");
  }

  Codehort.createEditor(false); // create the code editor ui
  Mobbing.timerFunction(); // start waiting to see if we want to start mobbing
  Session.showSessionInfo(Session.getSessionId()); // show the session we are in on the bottom status bar
}

const Codehort = (function() {

  let firepad;
  let firepadRef;
  let codeMirror;
  let username = ""; // will be set in getPref
  let userId = Math.floor(Math.random() * 9999999999).toString(); // will be set when we authenticate to firebase, just make a unique id
  let firepadUserList;

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

  Codehort.setCodeMirror = function(code) {
    codeMirror.setValue(code);
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
    // create new code editor ui by creating new codemirror.
    // only one codemirror can exist, so if we need to change this, we need to reload page
    if (codeMirror == null) {
      codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineNumbers: true, // line numbers
        mode: 'javascript' // JavaScript mode
      });
    }
    //Mobbing.updateMobbing(); // maybe don't need this here because of the page refresh
    Zoom.changePercent(0); // zoom into what user prefers

    // if you have connected to a previous session try to connect now?
    if (Session.getSessionId() && !Preferences.getSplashScreen() && !click) {
      // attempt to connect to this session id
      Session.joinSessionId(Session.getSessionId(), false);
    }
  }

  Codehort.connectFirepad = function() {
    // Get Firebase Database reference first if null
    if (firepadRef == null) {
      firepadRef = Session.getFirepad();
    }

    if (firepadRef != null) {
      // Create Firepad with default text
      firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        defaultText: '// Welcome to Codehort, start coding!\n\nconsole.log(\'hello codehort!\');\n\n',
        userId: this.userId // sign in with unique user id
      });

      // Create FirepadUserList (with our desired userId, usernames can change, so keep track with ids)
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

  // this delays in finding users because the userlist needs to populate first
  delay = ms => new Promise(res => setTimeout(res, ms));

  showNumberUsers = async () => {
    await delay(3000);
    let users = Codehort.getCurrentUsers();
    if (users.length > 0) {
      document.getElementById("sessionUsersFooter").innerHTML = "Users connected: " + users.length;
    }
    else {
      document.getElementById("sessionUsersFooter").innerHTML = "";
    }
  };

  Codehort.getCurrentUsers = function() {
    let users = [];
    let usersDom = firepadUserList.userList_.children[1];
    let main = usersDom.lastChild;
    for (var i=0; i < main.childNodes.length; i++) {
      let name = main.childNodes[i].lastChild.innerHTML;
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
    let outnode = document.getElementById("outputCode");
    outnode.innerHTML = "";
    Codehort.hidePanels();
  }

  Codehort.help = function() {
    window.open(
      'help.html', // open help document
      '_blank' // open in a new window
    );
  }
  return Codehort;
})();
