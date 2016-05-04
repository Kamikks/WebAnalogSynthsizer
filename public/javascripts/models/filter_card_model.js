// Model
function FilterCardModel(params) {
  params.deckId = 'deck3';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(FilterCardModel.prototype, ProtoCardModel.prototype);
  console.log(this);
  this.addKnob({name: 'Frequency', id: this.name + '_FREQUENCY', size: LARGE, value: 270, color: this.color});
  this.addKnob({name: 'Q', id: this.name + '_Q', size: MIDDLE, value: 10, color: this.color});
}


FilterCardModel.prototype = {
  play : function(prev) {
    this.audioNode = context.createBiquadFilter();
    this.audioNode.type = this.type
    // frequency: 0 - 10000
    this.audioNode.frequency.value = (this.ctrls['FREQUENCY'].value - 120) * 100 / 3
    // q: 0 - 1000
    this.audioNode.Q.value = (this.ctrls['Q'].value - 120) / 300
    prev.connect(this.audioNode);
    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode);
    } 
  },

  stop : {},
  postSend: {}
}
