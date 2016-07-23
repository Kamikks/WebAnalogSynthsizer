// Model
function PannerCardModel(params) {
  params.deckId = 'deck3';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(PannerCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'Pan', id: this.name + '_PAN', size: LARGE, value: 270, color: this.color});
}


PannerCardModel.prototype = {
  play : function(prev) {
    this.audioNode = context.createStereoPanner();
    // pan: -1 to 1
    this.audioNode.pan.value = (this.ctrls['Pan'].value - 270) / 150;
    prev.connect(this.audioNode);
    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode);
    } 
  },

  stop : {},
  postSend: {}
}
