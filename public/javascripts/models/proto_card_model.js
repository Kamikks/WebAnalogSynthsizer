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
  // TODO: sequence id will conflicts
  ProtoCardModel.list = $.grep(ProtoCardModel.list, function(obj) {
                     return id != obj.id;
                   });
  // remove ctrls, too
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

//ProtoCardModel.saveObj = function() {
//  var result = [];
//  $.each(ProtoCardModel.list, function(i, obj) {
//    result.push(obj.saveObj());
//  });
//  return result;
//}

//ProtoCardModel.loadObj = function(json) {
//  var card = null;
//  var objList = $.parseJSON(json);
//  // create all object
//  $.each(objList, function(i, obj) {
//    switch(obj.type) {
//      case SAW:
//      case SQUARE:
//      case SINE:
//        card = new OscCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
//        $.each(obj.ctrls, function(i, ctrl) {
//          card.ctrls[ctrl.key].value = ctrl.value;
//        });
//        break;
//      case ADSR:
//        card = new AdsrCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
//        $.each(obj.ctrls, function(i, ctrl) {
//          card.ctrls[ctrl.key].value = ctrl.value;
//        });
//        break;
//      case LOWPASS:
//      case HIGHPASS:
//      case BANDPASS:
//      case LOWSHELF:
//      case HIGHSHELF:
//      case PEACKING:
//      case NOTCH:
//        card = new FilterCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
//        $.each(obj.ctrls, function(i, ctrl) {
//          card.ctrls[ctrl.key].value = ctrl.value;
//        });
//        break;
//      case KEY:
//        card = new KeyCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
//        break;
//    }
//  }); 
//  // connect
//  // TODO merge to sendtoSelect() at proto_card_controller.js
//  $.each(objList, function(i, obj) {
//    $.each(obj.next, function(j, nextId) {
//      var sendFrom = ProtoCardModel.findById(obj.id);
//      var sendTo = ProtoCardModel.findById(nextId);
//      if(sendTo.type == ADSR && sendTo.prev.length > 0) {
//        sendTo = new AdsrCardModel({obj: sendTo});
//      }
//      sendFrom.disconnect({oneway: true});
//      sendFrom.connect(sendTo);
//    }); 
//  });
//}

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
    var _this = this;
    // if oneway, delete only next
    $.each(this.next, function(id, next) {
      next.prev.splice(next.prev.indexOf(_this), 1);
   //   console.log(_this);
   //   console.log(_this.next);
   //   console.log(next);
   //   console.log(id);
      _this.next.splice(id, 1);
      if(next.name == null) { 
        // next is clone
        var nextOrg = ProtoCardModel.findById(next.id);
        nextOrg.clone.splice(nextOrg.clone.indexOf(next), 1); 
      }
    });
    if(oneway == false) {
    // if twoway, delete from prev and next
      $.each(this.prev, function(id, prev) {
        prev.next.splice(prev.next.indexOf(_this), 1);
        _this.prev.splice(id, 1);
      });
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
//      clone: this.clone.length,
      ctrls: [],
      prev: [],
      next: []
    }
    for(var k in this.ctrls) {
      //obj.ctrls.push({key: k, id: this.ctrls[k].id, value: this.ctrls[k].value || null});
      obj.ctrls.push({key: k, value: this.ctrls[k].value || null});
    }
//    $.each(this.prev, function(i, prev) {
//      obj.prev.push(prev.id); 
//    }); 
    $.each(this.next, function(i, next) {
      obj.next.push(next.id); 
    }); 
    return obj;
  }
}
