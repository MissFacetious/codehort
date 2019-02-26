
function display(index) {
  if (index == 0) {
    document.getElementById("splashFirst").style.display = 'block';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'none';
  }
  if (index == 1) {
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'block';
    document.getElementById("splashThird").style.display = 'none';
  }
  if (index == 2) {
    document.getElementById("newSessionSplashBtn").disabled = false;
    document.getElementById("joinSessionSplashBtn").disabled = false;
    //document.getElementById("finishBtn").disabled = true;
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'block';
  }
  if (index == 3) {
    document.getElementById("splashFirst").style.display = 'none';
    document.getElementById("splashSecond").style.display = 'none';
    document.getElementById("splashThird").style.display = 'none';
    document.getElementById("codehort-splash").style.display = 'none';
    document.getElementById("overlay").style.display = 'none';
    // set the splash screen not to show next time
    splashScreen = false;
    var storage = window.localStorage;
    storage.setItem('splash', splashScreen);
  }
}
