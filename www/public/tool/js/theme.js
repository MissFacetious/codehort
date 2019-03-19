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
  var header = document.getElementsByTagName('head')[0];
  var link1 = document.createElement("link");
  var link2 = document.createElement("link");
  link1.setAttribute("ref", "stylesheet");
  link2.setAttribute("ref", "stylesheet");

  if (light) {
    link1.setAttribute("href", "./css/codemirror-light.css");
    link2.setAttribute("href", "./css/codehort-light.css");
    document.getElementById("grid-icon-light").style.display = 'block';
    document.getElementById("grid-icon-dark").style.display = 'none';
  }
  else {
    link1.setAttribute("href", "./css/codemirror-dark.css");
    link2.setAttribute("href", "./css/codehort-dark.css");
    document.getElementById("grid-icon-light").style.display = 'none';
    document.getElementById("grid-icon-dark").style.display = 'block';
  }

  header.appendChild(link1);
  header.appendChild(link2);
}
