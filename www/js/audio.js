const AudioPlayer = (function() {

  const aTone = new Audio('./audio/a-tone.mp3');
  const applause = new Audio('./audio/applause.mp3');
  const musicBox = new Audio('./audio/music_box.mp3');
  const errorTone = new Audio('./audio/error.mp3');

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
