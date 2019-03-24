var eachTimer;
var sentence;

var timerTimer; // in seconds
var currentSession;

var mobbingUsers = [];
var inMobbing = false;
var check = true;
var mobUser = '';

function changeQuantity(input, amount) {
  var value = document.getElementById(input).value;
  if (value > 1 && amount < 0) {
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
  // setup timers
  eachTimer = code;
  timerTimer = eachTimer * 60;
  currentSession = 0;

  sentence = "You will code for " + code;
  if (code > 1) {
    sentence += " minutes each.";
  }
  else {
    sentence += " minute each.";
  }
  document.getElementById("sentence").innerHTML = sentence;
  if (code > 1) {
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
  mobbingUsers = getCurrentUsers();
  // kick off the timer then with all this information
  youAreTheDriver();

  // update the text with information of how long the timer will take
  firepad.setText("// MOBBING!: "+sentence+
                  " - Mobbing session: " + currentSession + " - Currently in charge: " + mobUser +
                  " - // END MOBBING\n"+
                  code);


  // you are in charge, otherwise...
  codeMirror.setOption("readOnly", false);
  // update the bottom ui to show your in charge of mobbing
  document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";

  closePanel();
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
  if (check == true && snap != "") {
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
  else if (check == true && code.indexOf("MOBBING!") != -1) {
    inMobbing = true;
    check = false;
  }
  // keep checking to see if anyone has started to mob
  if (inMobbing && !check) {
    tries = 0;

    parseTheEditor();
    timerTimer = eachTimer * 60;

    if (mobUser == username) {
      // you are in charge, otherwise...
      codeMirror.setOption("readOnly", false);
      // update the bottom ui to show your in charge of mobbing
      document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";
    }
    else {
      // disable the text to show the countdown
      codeMirror.setOption("readOnly", true);
      // update the bottom ui to show it's readonly
      document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [READONLY]";
    }
  }
}

function getCurrentUsers() {
  var users = [];
  var usersDom = firepadUserList.userList_.children[1];
  var main = usersDom.lastChild;
  for (var i=0; i < main.childNodes.length; i++) {
    var name = main.childNodes[i].lastChild.innerHTML;
    users.push(name);
  }
  users.sort();
  console.log("list of users: " + users.length);
  for (var i=0; i < users.length; i++) {
    console.log("   " + users[i]);
  }
  console.log("end of list");
  return users;
}

function setCurrentMobUser() {
  var current = 0;
  for (var i=0; i < mobbingUsers.length; i++) {
    if (username == mobbingUsers[i]) {
      current = i;
      console.log("you found the current user " + username + " at " + i + " in the array");
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
  //parseTheEditor(); //not needed for mobUser assign, this is done in youAreTheDriver - will move to inside
  mobbingUsers = getCurrentUsers(); //for dropping out
  console.log("mobUser in continueTimer:" + mobUser);
// there is no mob user here
  if (mobUser != '' && mobUser == username) {
    console.log("increase the current session " + currentSession + "++ and get the next user after " + mobUser);
    currentSession++;

    // instead of picking the mob user being the next in line, find the current mob user and get the next person
    mobUser = setCurrentMobUser();
    console.log("current user was set " + mobUser);

    timerTimer = eachTimer * 60;
    // are you in charge? No!

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
      if (mobUser != username) {
        // disable the text to show the countdown
        codeMirror.setOption("readOnly", true);
        // update the bottom ui to show it's readonly
        document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [READONLY]";
      }
    }
    else {
      // we have some errors so let's just stop mobbing
      inMobbing = false;
      check = true;
    }
    // now that we have set the text for users, get ready to start up the next mobbing after
    // our new mobUser is set, currentsession set, timer set, checking is done
    check = false;
    inMobbing = true;
    timerTimer = eachTimer * 60;
  }
  else {
    tries = 0;
    parseTheEditor();
    // can we wait a few seconds here...
    timerTimer = eachTimer * 60;

    if (mobUser == username) {
      // you are in charge, otherwise...
      codeMirror.setOption("readOnly", false);
      // update the bottom ui to show your in charge of mobbing
      document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";
    }
    else {
      // disable the text to show the countdown
      codeMirror.setOption("readOnly", true);
      // update the bottom ui to show it's readonly
      document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [READONLY]";
    }
  }
}

var tries = 0;
function parseTheEditor() {
  // parse out what is in the editor for mobbing
  var code = codeMirror.getValue();

  var a = code.indexOf("You will code for ");
  var x = code.substring(a+18, code.length);
  a = x.indexOf(" minute");
  x = x.substr(0, a);
  eachTimer = x;

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
  console.log("parsed mobUser: " + num);
  //if (num == '' && tries < 10) {
  //  console.log("no mob user? " + code);
  //  // try again!
  //  parseTheEditor();
  //  tries++;
  //}
}

var snap = "";
function timerFunction() {
    if (!inMobbing) {
      var element2 = document.getElementById("mobbingFooter");
      if (element2) element2.innerHTML = "";
    }
    if (check) {
      waitingForMobbing();
      var element1 = document.getElementById("timerShow");
      if (element1) element1.innerHTML = "";
    }
    else if (inMobbing) {
      // we are in mobbing, start the countdown timer
      timerTimer--;
      // display timer on client
      document.getElementById("timerShow").innerHTML = timerTimer;
      if (timerTimer <= 0) {
        // done!
        console.log("DONE"); // miggs says DONE x 3
        // waiting on change to the Editor
        // take a snap shot of editor between
        snap = codeMirror.getValue();
        var a = snap.indexOf("// END MOBBING");
        snap = snap.substring(0, a);
        check = true;
        console.log("we are done, what is our mobber and current user? " + mobUser + ", " + username);
        if (mobUser != '' && mobUser == username) {
          // put up window that says we're done and on to the next mobber
          showPanel('codehort-continue-mob');
        }
      }
    }
    // constantly check to see if
    setTimeout(timerFunction, 1000/1);
}

timerFunction();
