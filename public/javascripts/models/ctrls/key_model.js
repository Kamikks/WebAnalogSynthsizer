//Model
function KeyModel() {
  this.id = null;
  this.name = null;
  this.type = null;
  this.value = null;
  this.cardId = null;
  this.size = null;
  this.turning = false;
  this.color = "#000";
  this.observers = [];
  this.keys = [];
}

KeyModel.list = [];

KeyModel.create = function(params) {
    var obj = new KeyModel();
    obj.id = params.id;
    obj.name = params.name;
    obj.value = params.value;
    obj.cardId = params.cardId;
    obj.size = params.size;
    obj.color = params.color;
    obj.type = KEY_CTRL;
    var note = 48;
    for (var i = 0; i < 14; i++) {
      if([0, 3, 7, 10, 14].indexOf(i) < 0) {
        obj.keys.push({x: 30 * i - 9, y: 0, h: 90, w: 18, black: true, on: false, note: note});
        note++;
      }
      obj.keys.push({x: 30 * i, y: 0, h: 140, w: 30, black: false, on: false, note: note});
      note++;
    };
    KeyModel.list.push(obj);
    updateKey(obj.id);
    return obj;
}

KeyModel.remove= function(id) {
    KeyModel.list = $.grep(KeyModel.list, function(obj) {
                       return id != obj.id;
                     });
    updateKeys();
}

KeyModel.clear = function() {
  KeyModel.list = [];
}

KeyModel.findById = function(id) {
    return $.grep(KeyModel.list, function(obj) {
             return id == obj.id;
           })[0];
}

KeyModel.updateView = function() {
  // TODO
}

KeyModel.prototype = {
  addObserver: function(observer) {
    this.observers.push(observer);
  },

  removeObserver: function(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  },

  changeValue: function(keydown, noteNum) {
    //console.log("keydown: " + keydown + ", note: " + noteNum);
    var key = $.grep(this.keys, function(obj) {
                 return obj.note == noteNum;
              })[0];
    if(keydown) {
      key.on = true;
    } else {
      key.on = false;
    }
    updateKey(this.id); 
    for(var i=0; i<this.observers.length; i++) {
      //console.log(this.observers);
      this.observers[i].changeValue(keydown, noteNum);
    }
  },

  updateView: function() {
  },

  remove: function() {
    KeyModel.remove(this.id);
  }
}
