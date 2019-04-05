function loadTheme() {
  if (Preferences.getLight()) {
    $('#css1').replaceWith('<link id="css2" rel="stylesheet" href="./css/codehort-light.css" />');
    $('#logo').replaceWith('<img name="logo" id="logo" class="logo" src="./img/codehort-logo-white-512.png" border="0">');
  }
  else {
    $('#css1').replaceWith('<link id="css2" rel="stylesheet" href="./css/codehort-dark.css" />');
    $('#logo').replaceWith('<img name="logo" id="logo" class="logo" src="./img/codehort-logo-dark.png" border="0">');
  }
}
