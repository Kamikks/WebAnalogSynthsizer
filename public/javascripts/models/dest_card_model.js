// Model
function DestCardModel(params) {
  params.deckId = 'deck3';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(DestCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'MASTER', id: this.name + '_MASTER', size: LARGE, value: 400, color: '#233433'});
}

DestCardModel.prototype = {
  play: function(prev) {
    this.audioNode = context.createGain();
    this.audioNode.gain.value = (this.ctrls['MASTER'].value - 120) / 300;
    prev.connect(this.audioNode);
    this.audioNode.connect(context.destination);
  },

  stop: function() {
    // nop
  }
}
