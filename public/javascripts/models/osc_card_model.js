// Model
function OscCardModel(params) {
  params.deckId = 'deck1';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(OscCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'TUNE', id: this.name + '_TUNE', size: LARGE, value: 270, color: '#233433'});
  this.addKnob({name: 'OCT', id: this.name + '_OCT', size: MIDDLE, value: 270, color: '#233433'});
  this.addKnob({name: 'SEND', id: this.name + '_SEND', size: MIDDLE, value: 270, color: '#233433'});
}


OscCardModel.prototype = {
  play: function(freq) {
    this.audioNode = context.createOscillator();
    this.audioNode.frequency.value = freq * 
      Math.pow(1.0595, (this.ctrls['TUNE'].value - 270) / 10) *
      Math.pow(1.0595, 12 * Math.floor((this.ctrls['OCT'].value - 270) / 50));
    this.audioNode.type = this.type;
    var sendLevel = context.createGain();
    this.audioNode.connect(sendLevel);
    sendLevel.gain.value = (this.ctrls['SEND'].value - 120) / 300;
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
