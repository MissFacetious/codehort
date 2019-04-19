const Preferences = (function() {
  let splashScreen = false;
  let light = false;

  function Preferences() {
    if (!(this instanceof Preferences)) return new Preferences();
  }

  Preferences.setLight = function(l) {
    light = l;
  }

  Preferences.getLight = function() {
    return light;
  }

  Preferences.setSplashScreen = function(s) {
    splashScreen = s;
  }

  Preferences.getSplashScreen = function() {
    return splashScreen;
  }

  Preferences.lightChange = function() {
    if (Preferences.getLight())
      Preferences.setLight(false);
    else
      Preferences.setLight(true);
  }

  Preferences.splashChange = function() {
    if (Preferences.getSplashScreen())
      Preferences.setSplashScreen(false);
    else
      Preferences.setSplashScreen(true);
  }

  Preferences.changeLight = function(beLight) {
    var element = document.getElementById("lightTest");
    Preferences.setLight(beLight);
    // set the style of the div to be either light or dark to show the user the change
    if (Preferences.getLight()) {
        //element.style...
        document.getElementById("lightTest").innerHTML = "A nice and light theme!";
    }
    else {
        //element.style...
        document.getElementById("lightTest").innerHTML = "Definately dark theme.";
    }
  }

  // at the start, get your preferences or set a default
  Preferences.getPref = function() {
    let storage = window.localStorage;

    let lightPref = storage.getItem('light');
    if (lightPref == null || lightPref == 'true') light = true;
    else light = false;
    let lightInput = document.getElementById("lightSwitch");
    if (lightInput != null)
      lightInput.checked = light;
    Preferences.setLight(light);

    // if you want to test the splash screen
    let splashSwitch = document.getElementById("splashSwitch");
    //storage.setItem('splash', true);
    let splashPref = storage.getItem('splash');
    if (splashPref == null || splashPref == 'true') splashScreen = true;
    else splashScreen = false;
    if (splashSwitch != null)
      splashSwitch.checked = splashScreen;
    Preferences.setSplashScreen(splashScreen);

    let userNameInput = document.getElementById("usernameInput");
    let userNamePref = storage.getItem('username');
    if (userNamePref == null || userNamePref == '') {
      if (Codehort.getUsername() == "") {
        var tempUser = "User"+Codehort.getUserId().substring(Codehort.getUserId().length-4, 3);
        console.log("temp " + tempUser);
        Codehort.setUsername(tempUser);
      }
      userNamePref = Codehort.getUsername();
    }
    if (userNameInput != null)
      userNameInput.value = userNamePref;

    Codehort.setUsername(userNamePref);
    Codehort.setUserId(Math.floor(Math.random() * 9999999999).toString());

    let zoomPref = storage.getItem('zoom');
    if (zoomPref == null || zoomPref == '' || zoomPref == 'undefined' || zoomPref == NaN) {
      zoomPref = 150; // default
    }
    Zoom.setZoom(zoomPref/100);
    let zoomInput = document.getElementById('zoom');
    if (zoomInput != null) {
      zoomInput.value = Math.round(100*Zoom.getZoom());
      Zoom.resize();
    }

    let sessionPref = storage.getItem('session');
    if (sessionPref != null) {
      Session.setSessionId(sessionPref);
    }

    var check1 = false, check2 = false, check3 = false, check4 = false, check4 = false, check5 = false, check6 = false, check7 = false;
    let challengeCheck1 = storage.getItem('check1');
    if (challengeCheck1 != null && challengeCheck1 == 'true') {
      check1 = true;
    }
    let challengeCheck2 = storage.getItem('check2');
    if (challengeCheck2 != null && challengeCheck2 == 'true') {
      check2 = true;
    }
    let challengeCheck3 = storage.getItem('check3');
    if (challengeCheck3 != null && challengeCheck3 == 'true') {
      check3 = true;
    }
    let challengeCheck4 = storage.getItem('check4');
    if (challengeCheck4 != null && challengeCheck4 == 'true') {
      check4 = true;
    }
    let challengeCheck5 = storage.getItem('check5');
    if (challengeCheck5 != null && challengeCheck5 == 'true') {
      check5 = true;
    }
    let challengeCheck6 = storage.getItem('check6');
    if (challengeCheck6 != null && challengeCheck6 == 'true') {
      check6 = true;
    }
    let challengeCheck7 = storage.getItem('check7');
    if (challengeCheck7 != null && challengeCheck7 == 'true') {
      check7 = true;
    }
    Editor.showChecks(check1, check2, check3, check4, check5, check6, check7);

    // quick check to see the splash screen or not for the test framework
    let baseURL = window.location+"";
    //strip out anything after #
    if (baseURL != null) {
      let n = baseURL.indexOf('#');
      baseURL = baseURL.substring(n+1, baseURL.length);
      if (baseURL == "none") {
        Preferences.setSplashScreen(false);
      }
    }
  }

  // preferences icon click
  Preferences.applyPref = function() {
    let storage = window.localStorage;
    // apply the prefs in the panel such as
    let userNameInput = document.getElementById("usernameInput").value;
    storage.setItem('username', userNameInput);

    // dark / light theme
    storage.setItem('light', Preferences.getLight());

    // show intro at startup
    storage.setItem('splash', Preferences.getSplashScreen());

    // zoom
    let element = document.getElementById('zoom');
    let zoomValue = element.value;
    storage.setItem('zoom', zoomValue);
    Codehort.hidePanels();

    // when we change the splash screen option, we reload and the splash screen shows here
    window.location.reload(true);
  }
  return Preferences;;
})();
