// Model
function OscCardModel(params) {
  params.deckId = 'deck1';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(OscCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'Send', id: this.name + '_SEND', size: LARGE, value: 270, color: this.color});
  this.addKnob({name: 'Detune', id: this.name + '_DETUNE', size: MIDDLE, value: 270, color: this.color});
  this.addKnob({name: 'Octave', id: this.name + '_OCT', size: MIDDLE, value: 270, color: this.color});
}


OscCardModel.prototype = {
  play: function(freq) {
    this.audioNode = context.createOscillator();
    this.audioNode.frequency.value = freq * 
          Math.pow(1.0595, 12 * Math.floor((this.ctrls['Octave'].value - 270) / 50));
    this.audioNode.detune.value = (this.ctrls['Detune'].value - 270) * (2 / 3);
    this.audioNode.type = this.type;
    var sendLevel = context.createGain();
    this.audioNode.connect(sendLevel);
    sendLevel.gain.value = (this.ctrls['Send'].value - 120) / 300;
    for(var i=0; i<this.next.length; i++) {
      this.next[i].play(sendLevel);
      this.audioNode.start(0);
      this.next[i].postSend();
    }
  },

  stop: function() {
    for(var i=0; i<this.next.length; i++) {
      this.next[i].stop();
      var currentTime = context.currentTime;
      this.audioNode.stop(currentTime + 1);
    }
  }
}
