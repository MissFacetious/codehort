var eachTimer;
var eachBreak;
var everyBreak;
var sentence;

var timerTimer; // in seconds
var timerBreak; // in seconds
var currentSession;

var mobbingUsers = [];
var inMobbing = false;
var check = true;
var mobUser;

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

  // setup timers
  eachTimer = code;
  eachBreak = thenbreak;
  everyBreak = every;

  timerTimer = eachTimer * 60;
  timerBreak = eachBreak * 60;
  currentSession = 0;

  sentence = "You will code for " + code + " minutes each, take a " + thenbreak + " minute break every "+ every + " coding ";
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

function startTimer() {
  number = 0;
  var code = codeMirror.getValue();
  // find if we have any line that has MOBBING on it first, and remove the line
  var pos = code.search("MOBBING");
  if (pos != -1) {
    // remove first line
    var until = code.indexOf("\n");
    code = code.substring(until+1, code.length);
    firepad.setText(code);
  }
  currentSession = 1;
  // since mobbing is removed now, we need to put it in with our information

  // get usernames
  getCurrentUsers();
  // kick off the timer then with all this information
  youAreTheDriver();

  // update the text with information of how long the timer will take
  firepad.setText("// MOBBING!: "+sentence+
                  " - Mobbing session: " + currentSession + " - Currently in charge: " + mobUser +
                  " - // END MOBBING\n"+
                  code);


}

function youAreTheDriver() {
  inMobbing = true;
  mobUser = username;
}

function waitingForMobbing() {
  var code = "";
  if (codeMirror != null) {
    code = codeMirror.getValue();
  }
  if (snap != "") {
    // check if snap is different than new snapshot
    var newsnap = codeMirror.getValue();
    var a = newsnap.indexOf("// END MOBBING");
    newsnap = newsnap.substring(0, a);
    if (snap != newsnap) {
      snap = "";
      check = false;
      continueTimer();
    }
  }
  else if (code.indexOf("MOBBING!") != -1) {
    inMobbing = true;
    check = false;
  }
  // keep checking to see if anyone has started to mob
  if (inMobbing && !check) {
    parseTheEditor();
    timerTimer = eachTimer * 60;
    timerBreak = eachBreak * 60;
    // we are not mobbing, who is in charge here?
    if (mobUser == username) {
      // you are in charge, otherwise...
    }
    else {
      // disable the text to show the countdown
    }
  }
}

function getCurrentUsers() {
  var usersDom = firepadUserList.userList_.children[1];
  var main = usersDom.lastChild;
  mobbingUsers = [];
  for (var i=0; i < main.childNodes.length; i++) {
    var name = main.childNodes[i].lastChild.innerHTML;
    mobbingUsers.push(name);
  }
}

function setCurrentMobUser() {
  var current = 0;
  for (var i=0; i < mobbingUsers.length; i++) {
    if (username == mobbingUsers[i]) {
      current = i;
      break;
    }
  }
  current++;
  if (current >= mobbingUsers.length) current = 0;
  mobUser = mobbingUsers[current];
  return mobUser;
}

function continueTimer() {
  closePanel();
  parseTheEditor();
  getCurrentUsers();

// there is no mob user here
  if (mobUser == username) {
    currentSession++;

    // instead of picking the mob user being the next in line, find the current mob user and get the next person
    mobUser = setCurrentMobUser();

    timerTimer = eachTimer * 60;
    // are you in charge?

    //youAreTheDriver();

    var before = codeMirror.getValue();
    var a = before.indexOf(" - Mobbing session:");
    before = before.substring(0, a);
    var after = codeMirror.getValue();
    var n = after.indexOf("// END MOBBING");
    after = after.substring(n, after.length);

    //console.log(before);
    //console.log("====");
    //console.log(after);
    // write to Editor
    if (before != null && before.length > 0) {
      firepad.setText(before+
                      " - Mobbing session: " + currentSession + " - Currently in charge: " + mobUser + " - " +
                      after);
    }
    else {
      // we have some errors so let's just stop mobbing
      inMobbing = false;
      check = true;
    }
  }
  else {
    // can we wait a few seconds here...
    timerTimer = eachTimer * 60;
    //parseTheEditor();
  }
}

function parseTheEditor() {
  // parse out what is in the editor for mobbing
  var code = codeMirror.getValue();

  var a = code.indexOf("You will code for ");
  var x = code.substring(a+18, code.length);
  a = x.indexOf(" minute");
  x = x.substr(0, a);
  eachTimer = x;

  var b = code.indexOf("take a ");
  var y = code.substring(b+7, code.length);
  b = y.indexOf(" minute");
  y = y.substr(0, b);
  eachBreak = y;

  var c = code.indexOf("every ");
  var z = code.substring(c+6, code.length);
  c = z.indexOf(" coding");
  z = z.substr(0, c);
  everyBreak = z;

  var position = code.indexOf("Mobbing session: ");
  var number = code.substring(position+17, code.length);
  position = number.indexOf(" -");
  number = number.substr(0, position);
  currentSession = number;
  // get the mob in charge
  var pos = code.indexOf("Currently in charge: ");
  var num = code.substring(pos+21, code.length);
  pos = num.indexOf(" -");
  num = num.substr(0, pos);
  mobUser = num;
}

var snap = "";
function timerFunction() {
    if (check) {
      waitingForMobbing();
      var element = document.getElementById("timerShow");
      if (element) element.innerHTML = "";
    }
    else if (inMobbing) {
      // we are in mobbing, start the countdown timer
      timerTimer--;
      // display timer on client
      document.getElementById("timerShow").innerHTML = timerTimer;
      if (timerTimer <= 0) {
        // done!
        console.log("DONE");
        // waiting on change to the Editor
        // take a snap shot of editor between
        snap = codeMirror.getValue();
        var a = snap.indexOf("// END MOBBING");
        snap = snap.substring(0, a);
        check = true;
        if (mobUser == username) {
          // put up window that says we're done and on to the next mobber
          showPanel('codehort-continue-mob');
        }
      }
    }
    // constantly check to see if
    setTimeout(timerFunction, 1000/100);
}

timerFunction();
