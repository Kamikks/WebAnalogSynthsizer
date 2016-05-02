// Model
function ProtoCardModel(params) {
  // name and id is unique
  var num = ProtoCardModel.findByType(params.type).length;
  this.name = params.name + num;
  this.id = params.name + num;
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
  updateCards();
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

ProtoCardModel.prototype.addKnob = function(params) {
  params.cardId = this.id;
  var obj = KnobModel.create(params);
  this.ctrls[obj.name] = obj;
}

ProtoCardModel.prototype.addKey = function(params) {
  params.cardId = this.id;
  var obj = KeyModel.create(params);
  obj.addObserver(this);
  this.ctrls[obj.name] = obj;
}

ProtoCardModel.prototype.connect = function(obj) {
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
}

ProtoCardModel.prototype.disconnect = function(params) {
  console.log("disconnect: " + this.name);
  var oneway = params.oneway || false;
  var _this = this;
  // if oneway, delete only next
  $.each(this.next, function(id, next) {
    next.prev.splice(next.prev.indexOf(_this), 1);
    console.log(_this);
    console.log(_this.next);
    console.log(next);
    console.log(id);
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
 
}


ProtoCardModel.prototype.updateView = function() {
    updateCard();
}

