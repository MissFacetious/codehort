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

  if (light) {
    document.getElementById("grid-icon-light").style.display = 'block';
    document.getElementById("grid-icon-dark").style.display = 'none';
  }
  else {
    document.getElementById("grid-icon-light").style.display = 'none';
    document.getElementById("grid-icon-dark").style.display = 'block';
  }
}
