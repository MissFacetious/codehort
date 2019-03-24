
function display(index) {
  if (index == 0) {
    document.getElementById("splashFirst").style.display = 'block';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'none';
    document.getElementById("splashForth").style.display = 'none';
    nameGenerator();
  }
  if (index == 1) {
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'block';
    document.getElementById("splashThird").style.display = 'none';
    document.getElementById("splashForth").style.display = 'none';
  }
  if (index == 2) {
    document.getElementById("newSessionSplashBtn").disabled = false;
    document.getElementById("joinSessionSplashBtn").disabled = false;
    //document.getElementById("finishBtn").disabled = true;
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'block';
    document.getElementById("splashForth").style.display = 'none';
  }
  if (index == 3) {
    document.getElementById("newSessionSplashBtn").disabled = false;
    document.getElementById("joinSessionSplashBtn").disabled = false;
    //document.getElementById("finishBtn").disabled = true;
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'none';
    document.getElementById("splashForth").style.display = 'block';
  }
  if (index == 4) {
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'none';
    document.getElementById("splashForth").style.display = 'none';
    document.getElementById("codehort-splash").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
    // set the splash screen not to show next time
    splashScreen = false;
    var storage = window.localStorage;
    storage.setItem('splash', splashScreen);

    var usernameInput = document.getElementById("usernameSplashInput");
    if (usernameInput.value == "") {
      usernameInput.value = usernameInput.placeholder;
    }
    username = usernameInput.value;
    document.getElementById("usernameInput").value = username;
    storage.setItem('username', username);
  }
}

function splashChange() {
  if (splashScreen)
    splashScreen = false;
  else
    splashScreen = true;
}

var firstPart = ["Lightning", "Thunder", "Sky", "Sea", "Ocean", "Green", "Blue", "Red", "Yellow", "Orange", "Colorful", "Strange", "Serious", "Magnificent", "Great"]; // nouns!
var lastPart = ["Monkey", "Squirrel", "Cat", "Mouse", "Koala", "Donkey", "Alien", "Fish", "Duck", "Goose", "Moose", "Bear", "Watermelon", "Cherry", "Strawberry", "Grape", "Blueberry", "Pineapple", "Pear", "Dog"]; // animals!

function nameGenerator() {
  var random1 = Math.round(Math.random()*firstPart.length);
  var random2 = Math.round(Math.random()*lastPart.length);

  console.log("random numbers " + random1 + " " + random2);
  var name = firstPart[random1] + "" + lastPart[random2];
  console.log("random name generator: " + name);
  var usernameInput = document.getElementById("usernameSplashInput");
  if (usernameInput.value == "") {

    usernameInput.placeholder = name;
  }
}
