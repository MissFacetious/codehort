var Preferences = (function() {
  var splashScreen = false;
  var light = false;

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
    var storage = window.localStorage;

    var lightPref = storage.getItem('light');
    if (lightPref == null || lightPref == 'true') light = true;
    else light = false;
    var lightInput = document.getElementById("lightSwitch");
    if (lightInput != null)
      lightInput.checked = light;
    Preferences.setLight(light);

    // if you want to test the splash screen
    var splashSwitch = document.getElementById("splashSwitch");
    //storage.setItem('splash', true);
    var splashPref = storage.getItem('splash');
    if (splashPref == null || splashPref == 'true') splashScreen = true;
    else splashScreen = false;
    if (splashSwitch != null)
      splashSwitch.checked = splashScreen;
    Preferences.setSplashScreen(splashScreen);

    var userNameInput = document.getElementById("usernameInput");
    var userNamePref = storage.getItem('username');
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

    var zoomPref = storage.getItem('zoom');
    if (zoomPref == null || zoomPref == '' || zoomPref == 'undefined' || zoomPref == NaN) {
      zoomPref = 150; // default
    }
    Zoom.setZoom(zoomPref/100);
    var zoomInput = document.getElementById('zoom');
    if (zoomInput != null) {
      zoomInput.value = Math.round(100*Zoom.getZoom());
      Zoom.resize();
    }

    var sessionPref = storage.getItem('session');
    if (sessionPref != null) {
      Session.setSessionId(sessionPref);
    }

    //console.log("light theme - " + Preferences.getLight());
    //console.log("splash screen - " + Preferences.getSplashScreen());
    //console.log("username is - " + Codehort.getUsername());
    //console.log("zoom at - " + Zoom.getZoom());
    //console.log("session id - " + Session.getSessionId());

    // quick check to see the splash screen or not for the test framework
    let baseURL = window.location+"";
    //strip out anything after #
    if (baseURL != null) {
      var n = baseURL.indexOf('#');
      baseURL = baseURL.substring(n+1, baseURL.length);
      if (baseURL == "none") {
        Preferences.setSplashScreen(false);
      }
    }
  }

  // preferences icon click
  Preferences.applyPref = function() {
    var storage = window.localStorage;
    // apply the prefs in the panel such as
    var userNameInput = document.getElementById("usernameInput").value;
    storage.setItem('username', userNameInput);

    // dark / light theme
    storage.setItem('light', Preferences.getLight());

    // show intro at startup
    storage.setItem('splash', Preferences.getSplashScreen());

    // zoom
    var element = document.getElementById('zoom');
    var zoomValue = element.value;
    storage.setItem('zoom', zoomValue);
    Codehort.hidePanels();

    //console.log("light theme - " + storage.getItem('light'));
    //console.log("splash screen - " + storage.getItem('splash'));
    //console.log("username is - " + storage.getItem('username'));
    //console.log("zoom at - " + Zoom.getZoom());
    //console.log("session id - " + Session.getSessionId());
    // when we change the splash screen option, we reload and the splash screen shows here
    window.location.reload(true);
  }
  return Preferences;;
})();
