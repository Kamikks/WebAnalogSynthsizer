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

  changeValue: function(keydown, key) {
    for(var i=0; i<this.observers.length; i++) {
      //console.log(this.observers);
      this.observers[i].changeValue(keydown, key);
    }
  },

  updateView: function() {
  }
}
