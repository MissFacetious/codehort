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
    $('#css1').replaceWith('<link id="css1" rel="stylesheet" href="./css/codemirror-light.css" />');
    $('#css2').replaceWith('<link id="css1" rel="stylesheet" href="./css/codehort-light.css" />');
    document.getElementById("grid-icon-light").style.display = 'block';
    document.getElementById("grid-icon-dark").style.display = 'none';
  }
  else {
    $('#css1').replaceWith('<link id="css1" rel="stylesheet" href="./css/codemirror-dark.css" />');
    $('#css2').replaceWith('<link id="css1" rel="stylesheet" href="./css/codehort-dark.css" />');
    document.getElementById("grid-icon-light").style.display = 'none';
    document.getElementById("grid-icon-dark").style.display = 'block';
  }
}
