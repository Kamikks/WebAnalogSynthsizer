// Model
function AdsrCardModel(params) {
  var obj = params.obj || null;
  if(obj) {
    var copy = $.extend(true, {}, params.obj);
    copy.name = null;
    copy.prev = [];
    copy.clone = [];
    obj.clone.push(copy);
    return copy;
  } else {
    params.type = ADSR;
    params.deckId = params.deckId || 'deck2';
    ProtoCardModel.call(this, params);
    Object.setPrototypeOf(AdsrCardModel.prototype, ProtoCardModel.prototype);
    this.addKnob({name: 'Attack Time', id: this.name + '_AttackTime', size: MIDDLE, value: 200, color: this.color});
    this.addKnob({name: 'Decay Level', id: this.name + '_Decay', size: MIDDLE, value: 200, color: this.color});
    this.addKnob({name: 'Decay Time', id: this.name + '_Time', size: MIDDLE, value: 200, color: this.color});
    this.addKnob({name: 'Sustain', id: this.name + '_Sustain', size: MIDDLE, value: 200, color: this.color});
    this.addKnob({name: 'Release', id: this.name + '_Release', size: MIDDLE, value: 200, color: this.color});
  } 
  // OscCardModel and AdsrCardModel have this.audioNode for each note number.
  this.audioNode = [];
  //for(var i = 48; i < 62; i++) {
  //  this.audioNode[i] = context.createGain();
  //} 
}


AdsrCardModel.prototype = {
  play: function(prev, noteNum) {
    this.startTime = 0;
    this.audioNode[noteNum] = this.audioNode[noteNum] || context.createGain();
    prev.disconnect();
    prev.connect(this.audioNode[noteNum]);
    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode[noteNum]);
    }
    this.startTime = context.currentTime;
    this.audioNode[noteNum].gain.setValueAtTime(0, this.startTime);

    // TODO: create get currentValue method
    // attackTime: 0 - 3[s]
    var attackTime = this.startTime + parseFloat((this.ctrls['Attack Time'].value - 120) / 100);
    // decayTime: 0 - 3[s]
    var decayTime = parseFloat((this.ctrls['Decay Time'].value - 120) / 100);
    var decayLevel = (this.ctrls['Decay Level'].value - 120) / 300;
    // sustainLevel
    var sustainLevel = (this.ctrls['Sustain'].value - 120) / 300;
    //attack
    this.audioNode[noteNum].gain.linearRampToValueAtTime(decayLevel, attackTime);
    //decay
    this.audioNode[noteNum].gain.setTargetAtTime(sustainLevel, attackTime, decayTime);
    //console.log("attackTime: " + attackTime + ", decayTime: " + decayTime + ", decayLevel: " + decayLevel + ", sustainLevel: " + sustainLevel);
  },

  stop: function(noteNum) {
    this.audioNode[noteNum] = null;
  }
}
