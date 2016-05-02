// Model
function KeyCardModel(params) {
  params.type = KEY;
  params.deckId = 'deck1';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(KeyCardModel.prototype, ProtoCardModel.prototype);
  this.addKey({name: 'KEYBOARD', id: this.name + '_KEY', color: '#233433', size: LARGE});
}

KeyCardModel.prototype = {
  changeValue: function(keydown, key) {
    if(keydown) {
      var freq = KEYC * Math.pow(1.0595, key);
      for(var i=0; i<this.next.length; i++) {
        this.next[i].play(freq);
      }
    } else {
      for(var i=0; i<this.next.length; i++) {
        this.next[i].stop();
      }
    }
  }
}

