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

function loadTheme() {
  if (light) {
    document.getElementById("grid-icon-light").style.display = 'block';
    document.getElementById("grid-icon-dark").style.display = 'none';
  }
  else {
    document.getElementById("grid-icon-light").style.display = 'none';
    document.getElementById("grid-icon-dark").style.display = 'block';
  }
}
