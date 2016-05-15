// Model
function KeyCardModel(params) {
  params.type = KEY;
  params.deckId = params.deckId || 'deck1';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(KeyCardModel.prototype, ProtoCardModel.prototype);
  this.addMidi({name: "MIDI", id: this.name + "_MIDI"});
  this.addKey({name: 'KEYBOARD', id: this.name + '_KEY', color: this.color, size: LARGE});
  this.keyonList = [];
  this.maxPolyCount = 3;
}

KeyCardModel.prototype = {
  changeValue: function(keydown, noteNum) {
    if(keydown) {
      if(this.keyonList.length < this.maxPolyCount) {
        for(var i=0; i<this.next.length; i++) {
          this.next[i].play(noteNum);
        }
        this.keyonList.push(noteNum);
      }
    } else {
      if(this.keyonList.length > 0 && this.keyonList.indexOf(noteNum) >= 0) {
        for(var i=0; i<this.next.length; i++) {
          this.next[i].stop(noteNum);
        }
        this.keyonList.splice(this.keyonList.indexOf(noteNum), 1);
      }
    }
  },

  noteon: function(noteNum) {
    this.changeValue(true, noteNum);
  },

  noteoff: function(noteNum) {
    this.changeValue(false, noteNum);
  }
}

