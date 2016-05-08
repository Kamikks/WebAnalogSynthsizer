// Model
function OscCardModel(params) {
  params.deckId = params.deckId || 'deck1';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(OscCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'Send', id: this.name + '_SEND', size: LARGE, value: 270, color: this.color});
  this.addKnob({name: 'Detune', id: this.name + '_DETUNE', size: MIDDLE, value: 270, color: this.color});
  this.addKnob({name: 'Octave', id: this.name + '_OCT', size: MIDDLE, value: 270, color: this.color});
  // OscCardModel and AdsrCardModel have this.audioNode for each note number.
  this.audioNode = [];
  this.sendLevel = [];
}


OscCardModel.prototype = {
  play: function(noteNum) {
    if(this.audioNode[noteNum]) {
      this.audioNode[noteNum].disconnect(0);
      this.audioNode[noteNum] = null;
    }
    this.audioNode[noteNum] = context.createOscillator();

    var freq = KEYC * Math.pow(1.0595, noteNum);
    this.audioNode[noteNum].frequency.value = freq * 
          Math.pow(1.0595, 12 * Math.floor((this.ctrls['Octave'].value - 270) / 50));
    this.audioNode[noteNum].detune.value = (this.ctrls['Detune'].value - 270) * (2 / 3);
    this.audioNode[noteNum].type = this.type;
    this.sendLevel[noteNum] = this.sendLevel[noteNum] || context.createGain();
    this.audioNode[noteNum].connect(this.sendLevel[noteNum]);
    this.sendLevel[noteNum].gain.value = (this.ctrls['Send'].value - 120) / 300;
    for(var i=0; i<this.next.length; i++) {
      // OSC's next must be ADSR
      this.next[i].play(this.sendLevel[noteNum], noteNum);

      //this.audioNode[noteNum].stop(0);
      this.audioNode[noteNum].start(0);
    }
  },

  stop: function(noteNum) {
    for(var i=0; i<this.next.length; i++) {
      this.next[i].stop(noteNum);
    }
    var currentTime = context.currentTime;
    this.audioNode[noteNum].stop(currentTime + 1);
  }
}
