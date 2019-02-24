

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
