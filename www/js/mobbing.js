var Mobbing = (function() {
  var eachTimer;
  var sentence;

  var timerTimer; // in seconds
  var currentSession;

  var mobbingUsers = [];
  var inMobbing = false;
  var check = true;
  var mobUser = '';

  function Mobbing() {
    if (!(this instanceof Mobbing)) {
      return new Mobbing();
    }
  }

  Mobbing.mob = function() {
    if (inMobbing) {
      var code = Codehort.getCodeMirror().getValue();
      Mobbing.removeMobbing(code);
      stopMobbing();
    }
    else {
      Codehort.showPanel('codehort-timer');
    }
  }

  function stopMobbing() {
    // remove the mobbing statement in the editor
    timerTimer = 0;
    inMobbing = false;
    check = true;
  }

  Mobbing.changeQuantity = function(input, amount) {
    var value = document.getElementById(input).value;
    if (value > 1 && amount < 0) {
      value--;
    }
    if (amount > 0) {
      value++;
    }
    document.getElementById(input).value = value;
    Mobbing.updateMobbing();
  }

  Mobbing.updateMobbing = function() {
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

Mobbing.removeMobbing = function(code) {
    // find if we have any line that has MOBBING on it first, and remove the line
    var pos = code.search("MOBBING");
    if (pos != -1) {
      // remove first line
      var until = code.indexOf("\n");
      code = code.substring(until+1, code.length);
      Codehort.setFirepad(code);
    }
  }

  Mobbing.startTimer = function() {
    number = 0;
    var code = Codehort.getCodeMirror().getValue();
    Mobbing.removeMobbing(code);
    currentSession = 1;
    // since mobbing is removed now, we need to put it in with our information

    // get usernames
    mobbingUsers = Codehort.getCurrentUsers();
    // kick off the timer then with all this information
    youAreTheDriver();

    // update the text with information of how long the timer will take
    Codehort.setFirepad("// MOBBING!: "+sentence+
                    " - Mobbing session: " + currentSession + " - Currently in charge: " + mobUser +
                    " - // END MOBBING\n"+
                    code);


    // you are in charge, otherwise...
    Codehort.getCodeMirror().setOption("readOnly", false);
    // update the bottom ui to show your in charge of mobbing
    document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";

    Codehort.closePanel();

    AudioPlayer.playTone();
  }

  function youAreTheDriver() {
    inMobbing = true;
    mobUser = Codehort.getUsername();
  }

  function waitingForMobbing() {
    var code = "";
    if (Codehort.getCodeMirror() != null) {
      code = Codehort.getCodeMirror().getValue();
    }
    if (check == true && snap != "") {
      // check if snap is different than new snapshot
      var newsnap = Codehort.getCodeMirror().getValue();
      var a = newsnap.indexOf("// END MOBBING");
      newsnap = newsnap.substring(0, a);
      if (snap != newsnap) {
        snap = "";
        check = false;
        Mobbing.continueTimer();
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

      if (mobUser == Codehort.getUsername()) {
        // you are in charge, otherwise...
        Codehort.getCodeMirror().setOption("readOnly", false);
        // update the bottom ui to show your in charge of mobbing
        document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";
      }
      else {
        // disable the text to show the countdown
        Codehort.getCodeMirror().setOption("readOnly", true);
        // update the bottom ui to show it's readonly
        document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [READONLY]";
      }
    }
  }

  function setCurrentMobUser() {
    var current = 0;
    for (var i=0; i < mobbingUsers.length; i++) {
      if (Codehort.getUsername() == mobbingUsers[i]) {
        current = i;
        console.log("you found the current user " + Codehort.getUsername() + " at " + i + " in the array");
        break;
      }
    }
    current++;
    if (current >= mobbingUsers.length) current = 0;
    mobUser = mobbingUsers[current];
    return mobUser;
  }

  Mobbing.continueTimer = function() {
    AudioPlayer.playTone();
    Codehort.closePanel();
    //parseTheEditor(); //not needed for mobUser assign, this is done in youAreTheDriver - will move to inside
    mobbingUsers = Codehort.getCurrentUsers(); //for dropping out
    console.log("mobUser in continueTimer:" + mobUser);
  // there is no mob user here
    if (mobUser != '' && mobUser == Codehort.getUsername()) {
      console.log("increase the current session " + currentSession + "++ and get the next user after " + mobUser);
      currentSession++;

      // instead of picking the mob user being the next in line, find the current mob user and get the next person
      mobUser = setCurrentMobUser();
      console.log("current user was set " + mobUser);

      timerTimer = eachTimer * 60;
      // are you in charge? No!

      var before = Codehort.getCodeMirror().getValue();
      var a = before.indexOf(" - Mobbing session:");
      before = before.substring(0, a);
      var after = Codehort.getCodeMirror().getValue();
      var n = after.indexOf("// END MOBBING");
      after = after.substring(n, after.length);

      //console.log(before);
      //console.log("====");
      //console.log(after);
      // write to Editor
      if (before != null && before.length > 0) {
        Codehort.setFirepad(before+
                        " - Mobbing session: " + currentSession + " - Currently in charge: " + mobUser + " - " +
                        after);
        if (mobUser != Codehort.getUsername()) {
          // disable the text to show the countdown
          Codehort.getCodeMirror().setOption("readOnly", true);
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

      if (mobUser == Codehort.getUsername()) {
        // you are in charge, otherwise...
        Codehort.getCodeMirror().setOption("readOnly", false);
        // update the bottom ui to show your in charge of mobbing
        document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [IN CHARGE OF EDITING]";
      }
      else {
        // disable the text to show the countdown
        Codehort.getCodeMirror().setOption("readOnly", true);
        // update the bottom ui to show it's readonly
        document.getElementById("mobbingFooter").innerHTML = "Mobbing with driver: " + mobUser + " [READONLY]";
      }
    }
  }

  //var tries = 0;
  function parseTheEditor() {
    // parse out what is in the editor for mobbing
    var code = Codehort.getCodeMirror().getValue();

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
    //if (num == '' && tries < 10) {
    //  console.log("no mob user? " + code);
    //  // try again!
    //  parseTheEditor();
    //  tries++;
    //}
  }

  var snap = "";
  Mobbing.timerFunction = function() {
      if (!inMobbing) {
        var element2 = document.getElementById("mobbingFooter");
        if (element2) element2.innerHTML = "";
      }
      if (check) {
        waitingForMobbing();
        var element1 = document.getElementById("timerShow");
        if (element1) element1.innerHTML = "";
        var element3 = document.getElementById("mobTimer");
        if (element3 != null) {
          element3.style.display="none";
          document.getElementById("mobBtn").classList.remove("stop");
          document.getElementById("mobBtn").classList.add("mobBtn");
          document.getElementById("mobText").innerHTML = "Mob Program";
          document.getElementById("newBtn").disabled = false;
          document.getElementById("newSessionBtn").disabled = false;
          document.getElementById("joinSessionBtn").disabled = false;
          document.getElementById("configBtn").disabled = false;
        }
      }
      else if (inMobbing) {
        // we are in mobbing, start the countdown timer
        timerTimer--;
        // display timer on client
        document.getElementById("timerShow").innerHTML = timerTimer;
        var element3 = document.getElementById("mobTimer");
        if (element3 != null) {
          element3.style.display="block";
          // do not allow any buttons other than stop to be hit
          document.getElementById("mobBtn").classList.remove("mobBtn");
          document.getElementById("mobBtn").classList.add("stop");
          document.getElementById("mobText").innerHTML = "Stop Mobbing";
          document.getElementById("newBtn").disabled = true;
          document.getElementById("newSessionBtn").disabled = true;
          document.getElementById("joinSessionBtn").disabled = true;
          document.getElementById("configBtn").disabled = true;
        }
        if (timerTimer <= 0) {
          // done!
          console.log("DONE"); // miggs says DONE x 3
          // waiting on change to the Editor
          // take a snap shot of editor between
          // remove all panels currently open, sorry...
          Codehort.closePanel();
          snap = Codehort.getCodeMirror().getValue();
          var a = snap.indexOf("// END MOBBING");
          snap = snap.substring(0, a);
          check = true;
          console.log("we are done, what is our mobber and current user? " + mobUser + ", " + Codehort.getUsername());
          if (mobUser != '' && mobUser == Codehort.getUsername()) {
            // put up window that says we're done and on to the next mobber
            AudioPlayer.playMusic();
            Codehort.showPanel('codehort-continue-mob');
          }
        }
      }
      // constantly check to see if
      setTimeout(Mobbing.timerFunction, 1000/1);
  }
  return Mobbing;
})();
