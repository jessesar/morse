function loadSound(url, cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      cb(buffer)
    }, function(e) {
        console.log(e)
    });
  }
  
  request.send();
}
    
window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    
var Morse = {
};

// Gain node needs to be mutated by volume control.
Morse.gainNode = null;

Morse.play = function() {
  if (!context.createGain)
    context.createGain = context.createGainNode;
  this.gainNode = context.createGain();
  var source = context.createBufferSource();
  source.buffer = BUFFERS.low;

  // Connect source to a gain node
  source.connect(this.gainNode);
  // Connect gain node to destination
  this.gainNode.connect(context.destination);
  // Start playback in a loop
  source.loop = true;
  if (!source.start)
    source.start = source.noteOn;
  source.start(0);
  this.source = source;
};

Morse.changeVolume = function(element) {
  this.gainNode.gain.value = element
};