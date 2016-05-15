// Model
function ProtoCardModel(params) {
  // name and id is unique
  var num = ProtoCardModel.findByType(params.type).length;
  this.name = params.id || params.name + num;
  this.id = params.id || params.name + num;
  this.type = params.type; 
  this.ctrls = params.ctrls || new Object();
  this.prev = params.prev || [];
  this.next = params.next || []; 
  this.audioNode = params.audioNode;
  this.color = params.color;
  this.deckId = params.deckId;
  this.clone = [];
  ProtoCardModel.list.push(this);
  updateCard(this.id);
}

ProtoCardModel.list = [];

ProtoCardModel.remove = function(id) {
  // remove ctrls
  var ctrls = ProtoCardModel.findById(id).ctrls;
  for(key in ctrls) {
    ctrls[key].remove();
  }
  // TODO: sequence id will conflicts
  ProtoCardModel.list = $.grep(ProtoCardModel.list, function(obj) {
                     return id != obj.id;
                   });
  updateCard(id);
}

ProtoCardModel.clear = function() {
  ProtoCardModel.list = [];
}

ProtoCardModel.findById = function(id) {
  return $.grep(ProtoCardModel.list, function(obj) {
           return id == obj.id;
         })[0];
}

ProtoCardModel.findByType = function(type) {
  return $.grep(ProtoCardModel.list, function(obj) {
           return type == obj.type;
         });
}

ProtoCardModel.updateView= function() {
  //TODO
}

ProtoCardModel.prototype = {
  addKnob: function(params) {
    params.cardId = this.id;
    var obj = KnobModel.create(params);
    this.ctrls[obj.name] = obj;
  },

  addKey: function(params) {
    params.cardId = this.id;
    var obj = KeyModel.create(params);
    obj.addObserver(this);
    this.ctrls[obj.name] = obj;
  },

  addMidi: function(params) {
    params.cardId = this.id;
    var obj = MidiselectorModel.create(params);
    obj.addObserver(this);
    this.ctrls[obj.name] = obj;
  },

  connect: function(obj) {
    console.log("connect from: " + this.name + ", connect to: " + obj.name);
    var i = this.next.length;
    obj.prev.push(this);
    this.next[i] = obj;
    if(this.name) {
      // if this is original, clones also have to connect to obj
      for(var i=0; i<this.clone.length; i++) {
        this.clone[i].next.push(obj);
      }
    }
  },

  disconnect: function(params) {
    console.log("disconnect: " + this.name);
    var oneway = params.oneway || false;
    var next = params.next || null;
    var _this = this;
    if(next) {
      // delete only one next
      console.log("disconnect: next=> " + next.name);
      next.prev.splice(next.prev.indexOf(_this), 1);
      _this.next.splice(_this.next.indexOf(next), 1);
    } else {
      // if oneway, delete only next
      $.each(this.next, function(id, next) {
        next.prev.splice(next.prev.indexOf(_this), 1);
        if(next.name == null) { 
          // next is clone
          var nextOrg = ProtoCardModel.findById(next.id);
          nextOrg.clone.splice(nextOrg.clone.indexOf(next), 1); 
        }
      });
      this.next = [];
      if(oneway == false) {
      // if twoway, delete from prev and next
        $.each(this.prev, function(id, prev) {
          prev.next.splice(prev.next.indexOf(_this), 1);
        });
        this.prev = [];
      }
    }
  },

  updateView: function() {
    updateCard();
  },

  convertObj: function() {
    var obj = {
      id: this.id,
      type: this.type,
      color: this.color,
      deckId: this.deckId,
      ctrls: [],
      prev: [],
      next: []
    }
    for(var k in this.ctrls) {
      obj.ctrls.push({key: k, value: this.ctrls[k].value || null});
    }
    $.each(this.next, function(i, next) {
      obj.next.push(next.id); 
    }); 
    return obj;
  },

  isConnected: function(next) {
    var result = false;
    $.each(this.next, function(id, obj) {
      if(obj.id == next.id) { result = true; }
    });
    return result;
  }
}
