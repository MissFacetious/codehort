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

  // update the text with information of how long the timer will take
  firepad.setText("// MOBBING!: "+sentence+
                  " - Mobbing session: " + currentSession + " -  Currently in charge: " + mobbingUsers[currentSession-1] +
                  "\n"+
                  code);

  // kick off the timer then with all this information
  youAreTheDriver();
}

function youAreTheDriver() {
  inMobbing = true;
  mobUser = username;
  console.log(mobUser);
}

function waitingForMobbing() {
  // keep checking to see if anyone has started to mob
  if (inMobbing) {
    check = false;
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
  console.log("users:");
  var usersDom = firepadUserList.userList_.children[1];
  var main = usersDom.lastChild;

  for (var i=0; i < main.childNodes.length; i++) {
    var name = main.childNodes[i].lastChild.innerHTML;
    mobbingUsers.push(name);
  }
}

function continueTimer() {
  var code = codeMirror.getValue();
  var position = code.indexOf("Mobbing session:");
  var number = code.substring(position+17, code.length);
  position = number.indexOf(" -");
  number = number.substr(0, position);
  console.log("number " + number);
  //turn number into currentSession
  currentSession++;
  // get the mob in charge

  getCurrentUsers();
  mobUser = mobbingUsers[currentSession];

  timerTimer = eachTimer * 60;

  // are you in charge?
  if (mobUser = username) {
    youAreTheDriver();
  }
  else {
    // disable the thing
  }
}


function timerFunction() {
    // do whatever you like here

    if (check) {
      waitingForMobbing();
      console.log("tick");
      var element = document.getElementById("timerShow");
      if (element) element.innerHTML = "";
    }
    else if (inMobbing) {
      // we are in mobbing, start the countdown timer
      //console.log(timerTimer);
      timerTimer--;
      // display timer on client
      document.getElementById("timerShow").innerHTML = timerTimer;
      if (timerTimer <= 0) {
        // done!
        console.log("DONE");
        continueTimer();
      }
    }
    // constantly check to see if
    setTimeout(timerFunction, 1000);
}

timerFunction();
