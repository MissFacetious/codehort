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
      document.getElementById("lightTest").innerHTML = "A nice and light theme!";
  }
  else {
      //element.style...
      document.getElementById("lightTest").innerHTML = "Definately dark theme.";
  }
}

function loadTheme() {

  if (light) {
    $('#css1').replaceWith('<link id="css2" rel="stylesheet" href="./css/codehort-light.css" />');
    $('#logo').replaceWith('<img name="logo" id="logo" class="logo" src="./img/codehort-logo-white-512.png" border="0">');
  }
  else {
    $('#css1').replaceWith('<link id="css2" rel="stylesheet" href="./css/codehort-dark.css" />');
    $('#logo').replaceWith('<img name="logo" id="logo" class="logo" src="./img/codehort-logo-dark.png" border="0">');
  }
}
