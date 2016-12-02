// Model
function DestCardModel(params) {
  params.deckId = 'deck3';
  params.type = DEST;
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(DestCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'MASTER', id: this.name + '_MASTER', size: LARGE, value: 400, color: this.color});
}

DestCardModel.prototype = {
  play: function(prev) {
    this.audioNode = this.audioNode || context.createGain();
    this.audioNode.gain.value = (this.ctrls['MASTER'].value - 120) / 300;
    // for multiple prev(e.g. delayNode)
    if(prev['wet'] != undefined) {
      for(key in prev) {
        prev[key].connect(this.audioNode);
      }
    } else {
      prev.connect(this.audioNode);
    }
    this.audioNode.connect(context.destination);
  },

  stop: function() {
    // nop
  }
}
