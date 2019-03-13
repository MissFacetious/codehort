var splashScreen = false;
var light = false;

// at the start, get your preferences or set a default
function getPref() {
  var storage = window.localStorage;

  var lightPref = storage.getItem('light');
  if (lightPref == null || lightPref == 'true') light = true;
  else light = false;
  var lightInput = document.getElementById("lightSwitch");
  lightInput.checked = light;

  // if you want to test the splash screen
  var splashSwitch = document.getElementById("splashSwitch");
  //storage.setItem('splash', true);
  var splashPref = storage.getItem('splash');
  if (splashPref == null || splashPref == 'true') splashScreen = true;
  else splashScreen = false;
  splashSwitch.checked = splashScreen;

  var userNameInput = document.getElementById("usernameInput");
  var userNamePref = storage.getItem('username');
  if (userNamePref == null || userNamePref == '') {
    if (username == "") username = "User"+userId.substring(userId.length-4, 3);
    userNamePref = username;
  }
  userNameInput.value = userNamePref;
  username = userNamePref;

  var zoomPref = storage.getItem('zoom');
  if (zoomPref == null || zoomPref == '' || zoomPref == 'undefined') {
    zoom = 1.5; // default
  }
  else {
    zoom = parseFloat(Math.round(zoomPref));
  }
  console.log(zoom);
  document.getElementById('zoom').value = Math.round(100*zoom);
  resize();

  var sessionPref = storage.getItem('session');
  if (sessionPref != null) {
    sessionId = sessionPref;
  }

  loadTheme();
}

// preferences icon click
function applyPref() {
  var storage = window.localStorage;
  // apply the prefs in the panel such as
  var userNameInput = document.getElementById("usernameInput").value;
  storage.setItem('username', userNameInput);

  // dark / light theme
  storage.setItem('light', light);

  // show intro at startup
  storage.setItem('splash', splashScreen);
  // display chat

  // zoom
  changePercent(0);
  var zoomValue = parseFloat(Math.round(100*zoom));
  storage.setItem('zoom', zoomValue);
  console.log('set zoom ' + storage.getItem('zoom'));
  hidePanels();

  // when we change the splash screen option, we reload and the splash screen shows here
  //window.location.reload(true);
}

function loadTheme() {
  var fileref1=document.createElement("link");
      fileref1.setAttribute("rel", "stylesheet");
      fileref1.setAttribute("type", "text/css");
  var fileref2=document.createElement("link");
      fileref2.setAttribute("rel", "stylesheet");
      fileref2.setAttribute("type", "text/css");
  if (light) {
    fileref1.setAttribute("href", "./css/codemirror-light.css");
    fileref2.setAttribute("href", "./css/codehort-light.css");
  }
  else {
    fileref1.setAttribute("href", "./css/codemirror-dark.css");
    fileref2.setAttribute("href", "./css/codehort-dark.css");
  }
  document.getElementsByTagName('head')[0].appendChild(fileref1);
  document.getElementsByTagName('head')[0].appendChild(fileref2);
}

function lightChange() {
  if (light)
    light = false;
  else
    light = true;
}

function changeLight(beLight) {
  light = beLight;
  var element = document.getElementById("lightTest");
  // set the style of the div to be either light or dark to show the user the change
  if (light) {
      //element.style...
  }
  else {
      //element.style...
  }
}
