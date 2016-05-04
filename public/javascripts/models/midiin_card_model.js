// Model
function MidiinCardModel(params) {
  params.deckId = 'deck3';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(MidiinCardModel.prototype, ProtoCardModel.prototype);
  this.addMidi({name: "MIDIIN", id: this.name + "_MIDIIN"});
}


MidiinCardModel.prototype = {
  play : function(prev) {
  },

  stop : {},
  postSend: {}
}
