var splashScreen = false;

// at the start, get your preferences or set a default
function getPref() {
  var storage = window.localStorage;

  var splashPref = storage.getItem('splash');
  if (splashPref == null || splashPref == 'true') splashScreen = true;
  else splashScreen = false;

  var userNameInput = document.getElementById("usernameInput");
  var userNamePref = storage.getItem('username');
  if (userNamePref == null || userNamePref == '') {
    if (username == "") username = "User"+userId.substring(userId.length-4, 3);
    userNamePref = username;
  }
  userNameInput.value = userNamePref;
  username = userNamePref;

  var zoomPref = storage.getItem('zoom');
  if (zoomPref == null || zoomPref == '') {
    zoom = 1.5; // default
  }
  else {
    zoom = zoomPref;
    document.getElementById('zoom').value = Math.round(100 * zoom);
  }
  resize();
}

// preferences icon click
function applyPref() {
  var storage = window.localStorage;
  // apply the prefs in the panel such as
  var userNameInput = document.getElementById("usernameInput").value;
  //var value = storage.getItem('username'); // Pass a key name to get its value.
  storage.setItem('username', userNameInput); // Pass a key name and its value to add or update that key.

  // dark / light theme

  // show intro at startup

  // display chat

  // zoom
  changePercent(0);
  storage.setItem('zoom', zoom);

  hidePanels();
  window.location.reload(true);
}
