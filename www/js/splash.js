var Splash = (function() {

  function Splash() {
    if (!(this instanceof Splash)) {
      return new Splash();
    }
  }

  Splash.display = function(index) {
    if (index == 0) {
      document.getElementById("splashFirst").style.display = 'block';
      document.getElementById("splashSecond").style.display = 'none';
      document.getElementById("splashThird").style.display = 'none';
      document.getElementById("splashForth").style.display = 'none';
      var name = Codehort.getUsername();
      var already = true;
      if (name == null || name == "") {
          name = nameGenerator();
          already = false;
      }
      var usernameInput = document.getElementById("usernameSplashInput");
      if (usernameInput.value == "") {
        if (already) usernameInput.value = name;
        else usernameInput.placeholder = name;
      }
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
      Preferences.setSplashScreen(false);
      var storage = window.localStorage;
      storage.setItem('splash', Preferences.getSplashScreen());
      var splashSwitch = document.getElementById("splashSwitch");
      if (splashSwitch != null)
        splashSwitch.checked = Preferences.getSplashScreen();

      var lightInput = document.getElementById("lightSwitch");
      if (lightInput != null)
        lightInput.checked = Preferences.getLight();

      var usernameInput = document.getElementById("usernameSplashInput");
      if (usernameInput.value == "") {
        usernameInput.value = usernameInput.placeholder;
      }
      Codehort.setUsername(usernameInput.value);
      document.getElementById("usernameInput").value = Codehort.getUsername();
      storage.setItem('username', Codehort.getUsername());

      // apply preferences
      Preferences.applyPref();
    }
  }

  function nameGenerator() {
    firstPart = ["Lightning", "Thunder", "Sky", "Sea", "Ocean", "Green", "Blue", "Red", "Yellow", "Orange", "Colorful", "Strange", "Serious", "Magnificent", "Great"]; // nouns!
    lastPart = ["Monkey", "Squirrel", "Cat", "Mouse", "Koala", "Donkey", "Alien", "Fish", "Duck", "Goose", "Moose", "Bear", "Watermelon", "Cherry", "Strawberry", "Grape", "Blueberry", "Pineapple", "Pear", "Dog"]; // animals!

    var random1 = Math.round(Math.random()*(firstPart.length-1));
    var random2 = Math.round(Math.random()*(lastPart.length-1));

    var name = firstPart[random1] + "" + lastPart[random2];
    return name;
  }
  return Splash;
})();
