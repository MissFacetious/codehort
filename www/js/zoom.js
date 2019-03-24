var zoom;

// zoom out or zoom in icon click
function changeSize(i) {
  // do not allow it to zoom out less than 0.1 and more than 10
  if (zoom > 0.5 && i < 0) {
    if (zoom < 1.2) {
      zoom += 0.1*i;
    }
    else {
      zoom += 0.1*i;
    }
  }
  if (zoom < 7.2 && i > 0) {
    if (zoom < 1.2) {
      zoom += 0.1*i;
    }
    else {
      zoom += 0.1*i;
    }
  }
  resize();
  var storage = window.localStorage;
  storage.setItem('zoom1', parseFloat(zoom));
  // change value in Preferences
  var element = document.getElementById('zoom');
  if (element) {
    element.value = Math.round(100*zoom);
  }
}

function resize() {
  var container = document.getElementsByClassName('CodeMirror');
  if (container != null && container.length > 0) {
    // only the first one
    container[0].style.zoom = zoom;
  }
  var element = document.getElementById('zoomTest');
  if (element != null) {
    element.style.zoom = zoom;
  }
}

function changePercent(amount) {
  var element = document.getElementById('zoom');

  if (element != null) {
    var value = element.value;
    value = value / 100;

    if (value > 0 && amount < 0) {
      changeSize(amount);
    }
  }
  if (amount > 0) {
    changeSize(amount);
  }
  if (amount == 0) {
    zoom = value;
    resize();
  }
  if (element != null) {
    element.value = Math.round(100 * zoom);
  }
}

CodeMirror.commands.zoomin = changePercent(1);
CodeMirror.commands.zoomout = changePercent(-1);
