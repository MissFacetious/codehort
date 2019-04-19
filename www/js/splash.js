const Splash = (function() {

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
      let name = Codehort.getUsername();
      let already = true;
      if (name == null || name == "") {
          name = nameGenerator();
          already = false;
      }
      let usernameInput = document.getElementById("usernameSplashInput");
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
      let storage = window.localStorage;
      storage.setItem('splash', Preferences.getSplashScreen());
      let splashSwitch = document.getElementById("splashSwitch");
      if (splashSwitch != null)
        splashSwitch.checked = Preferences.getSplashScreen();

      let lightInput = document.getElementById("lightSwitch");
      if (lightInput != null)
        lightInput.checked = Preferences.getLight();

      let usernameInput = document.getElementById("usernameSplashInput");
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

    let random1 = Math.round(Math.random()*(firstPart.length-1));
    let random2 = Math.round(Math.random()*(lastPart.length-1));

    let name = firstPart[random1] + "" + lastPart[random2];
    return name;
  }
  return Splash;
})();
