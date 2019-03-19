var eachTimer;
var eachBreak;
var everyBreak;

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

function startTimer() {
  // get usernames
  var usernames = ["user1", "user2", "user3"];
  updateTimer(0, usernames);
}

function continueTimer() {
  var newSession = 1;
  var usernames = ["user1", "user2", "user3"];
  updateTimer(newSession, usernames);
}

function updateTimer(session, usernames) {
  // A post entry.
  session++;
  var postData = {
    uid: sessionId,
    //You will code for 5 minutes each take a 10 minute break every 3 coding sessions.
    eachTimer: 5,//eachTimer,
    eachBreak: 5,//eachBreak,
    everyBreak: 5,//everyBreak,
    currentSession: session, // session 1 would be the first person on the list
    usernames: ['usernames']
    //startTime: TIME_STAMP,
    //stopTime: 235,
    // so start with the first person username, when the time is up,
    // go to the next in the list. Add anyone else who has either changed their name or added to the session at the end of the list.
    // if that user doesn't exist anymore, remove it from the list and go to the next one. If they don't exist, don't incremenet the session
    // breaks will be taken currentSession % everyBreak == 0.
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('timer').push().key;
  console.log(newPostKey);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
    updates['/timer/' + newPostKey] = postData;
    console.log(updates);
  return firebase.database().ref().update(updates);
}
