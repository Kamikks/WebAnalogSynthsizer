//Model
function KnobModel() {
  this.id = null;
  this.name = null;
  this.type = null;
  this.value = null;
  this.cardId = null;
  this.size = null;
  this.turning = false;
  this.color = "#000";
}

KnobModel.list = [];

KnobModel.create = function(params) {
  var obj = new KnobModel();
  obj.id = params.id;
  obj.name = params.name;
  obj.value = params.value;
  obj.cardId = params.cardId;
  obj.size = params.size;
  obj.color = params.color;
  obj.type = KNOB_CTRL;
  KnobModel.list.push(obj);
  updateKnob(obj.id);
  return obj;
}

KnobModel.remove = function(id) {
  KnobModel.list = $.grep(KnobModel.list, function(obj) {
                     return id != obj.id;
                   });
  updateKnobs();
}

KnobModel.findById = function(id) {
  return $.grep(KnobModel.list, function(obj) {
           return id == obj.id;
         })[0];
}

KnobModel.findByTurning = function(val) {
  return $.grep(KnobModel.list, function(obj) {
    return val == obj.turning;
  })[0];
}


KnobModel.updateView = function() {
  // TODO
}

KnobModel.prototype.changeValue = function(val) {
  this.value = val;
  // 値を変えてview通知
  updateKnob(this.id);
}


KnobModel.prototype.updateView = function() {
}

