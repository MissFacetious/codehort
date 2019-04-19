const Zoom = (function() {
  let zoom;

  function Zoom() {
    if (!(this instanceof Zoom)) {
      return new Zoom();
    }
  }

  Zoom.setZoom = function(z) {
    this.zoom = z;
  }

  Zoom.getZoom = function() {
    return this.zoom;
  }
  // zoom out or zoom in icon click
  Zoom.changeSize = function(i) {
    // do not allow it to zoom out less than 0.1 and more than 10
    if (this.zoom > 0.5 && i < 0) {
      if (this.zoom < 1.2) {
        this.zoom += 0.1*i;
      }
      else {
        this.zoom += 0.1*i;
      }
    }
    if (this.zoom < 7.2 && i > 0) {
      if (this.zoom < 1.2) {
        this.zoom += 0.1*i;
      }
      else {
        this.zoom += 0.1*i;
      }
    }
    Zoom.resize();
    let storage = window.localStorage;
    storage.setItem('zoom1', parseFloat(this.zoom));
    // change value in Preferences
    let element = document.getElementById('zoom');
    if (element) {
      element.value = Math.round(100*this.zoom);
    }
  }

  Zoom.resize = function() {
    let container = document.getElementsByClassName('CodeMirror');
    if (container != null && container.length > 0) {
      // only the first one
      container[0].style.zoom = Zoom.getZoom();
    }
    let element = document.getElementById('zoomTest');
    if (element != null) {
      element.style.zoom = Zoom.getZoom();
    }
  }

  Zoom.changePercent = function(amount) {
    let element = document.getElementById('zoom');

    if (element != null) {
      let value = element.value;
      value = value / 100;

      if (value > 0 && amount < 0) {
        Zoom.changeSize(amount);
      }
    }
    if (amount > 0) {
      Zoom.changeSize(amount);
    }
    if (amount == 0) {
    //  Zoom.setZoom(value);
      Zoom.resize();
    }
    if (element != null && element > 0) {
      element.value = Math.round(100 * this.zoom);
    }
  }
  return Zoom;
})();
CodeMirror.commands.zoomin = Zoom.changePercent(1);
CodeMirror.commands.zoomout = Zoom.changePercent(-1);
