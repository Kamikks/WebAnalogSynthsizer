function MidiselectorModel() {
  this.id = null;
  this.name = null;
  this.cardId = null;
  this.color = "#000";
  this.inputs = [];
  this.outputs = [];
  this.observers = [];
  this.type;
}

MidiselectorModel.list = [];

MidiselectorModel.create = function(params) {
  var obj = new MidiselectorModel();
  obj.id = params.id;
  obj.name = params.name;
  obj.cardId = params.cardId;
  obj.color = params.color;
  obj.inputs = [];
  obj.outputs = [];
  obj.type = MIDI_CTRL;
  MidiselectorModel.list.push(obj);
  // https server is required when use sysex
  if(navigator.requestMIDIAccess != undefined) {
    navigator.requestMIDIAccess({sysex: false}).then(obj.loadMidiDevice.bind(obj), obj.loadError);
  }
  return obj;
}

MidiselectorModel.remove = function(id) {
  MidiselectorModel.list = $.grep(MidiselectorModel.list, function(obj) {
                             return id != obj.id;
                           });
  updateMidiselectors();
}

MidiselectorModel.clear = function() {
  MidiselectorModel.list = [];
}

MidiselectorModel.findById = function(id) {
  return $.grep(MidiselectorModel.list, function(obj) {
           return id == obj.id;
         })[0];
}

MidiselectorModel.prototype = {
  loadMidiDevice: function(midiAccess) {
    if (typeof midiAccess == 'function') {
      this.inputs = midiAccess.inputs();
    } else {
      var inputs = midiAccess.inputs.values();
      for(var i=inputs.next(); !i.done; i = inputs.next()) {
        this.inputs.push(i.value);
      }
    }
    updateMidiselector(this.id);
  },

  loadError: function() {
    console.log("error while loading midi device.");
  },

  noteon: function(noteNum) {
    //console.log("noteon: " + noteNum);
    for(var i=0; i<this.observers.length; i++) {
      this.observers[i].noteon(noteNum);
    }
  },

  noteoff: function(noteNum) {
    //console.log("noteoff: " + noteNum);
    for(var i=0; i<this.observers.length; i++) {
      this.observers[i].noteoff(noteNum);
    }
  },

  addObserver: function(observer) {
    this.observers.push(observer);
  },

  removeObserver: function(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  },

  remove: function() {
    MidiselectorModel.remove(this.id);
  }
  
}
