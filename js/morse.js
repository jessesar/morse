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
  
  var low_source = context.createBufferSource();
  low_source.buffer = BUFFERS.low;

  low_source.loop = true;
  low_source.start(0);
  
  var high_source = context.createBufferSource();
  high_source.buffer = BUFFERS.high;

  high_source.loop = true;
  high_source.start(0);
  
  this.low_source = low_source;
  this.high_source = high_source
  
  low_source.connect(this.gainNode);
  this.gainNode.connect(context.destination);
};

Morse.changeVolume = function(element) {
  this.gainNode.gain.value = element
};

Morse.changePitch = function(pitch) {
    if(pitch == 'low') {
        this.high_source.disconnect(this.gainNode);
        this.low_source.connect(this.gainNode);
    }
    
    if(pitch == 'high') {
        this.low_source.disconnect(this.gainNode);
        this.high_source.connect(this.gainNode);
    }
}