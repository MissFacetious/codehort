var AudioPlayer = (function() {

  var aTone = new Audio('./audio/a-tone.mp3');
  var applause = new Audio('./audio/applause.mp3');
  var musicBox = new Audio('./audio/music_box.mp3');
  var errorTone = new Audio('./audio/error.mp3');

  function AudioPlayer() {
    if (!(this instanceof AudioPlayer)) {
      return new AudioPlayer();
    }
  }

  AudioPlayer.playTone = function() {
    aTone.play();
  }

  AudioPlayer.playApplause = function() {
    applause.play();
  }

  AudioPlayer.playMusic = function() {
    musicBox.play();
  }

  AudioPlayer.playError = function() {
    errorTone.play();
  }
  return AudioPlayer;
})();
