//Model
function KnobModel() {
  this.id = null;
  this.name = null;
  this.value = null;
  this.cardId = null;
  this.size = null;
  this.turning = false;
  this.color = "#000";
}

KnobModel.list = [];

KnobModel.add = function(params) {
  var obj = new KnobModel();
  obj.id = params.id;
  obj.name = params.name;
  obj.value = params.value;
  obj.cardId = params.cardId;
  obj.size = params.size;
  obj.color = params.color;
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

// View
function updateKnobs() {
  // TODO
}

function updateKnob(id) {
  var obj = KnobModel.findById(id);
  if(obj) {
    if ($("#"+id)[0] == null) {
      // create new elem
      var card = CardModel.findById(obj.cardId);
      //console.log($("#"+obj.cardId+" div div").eq(0));
      $("#"+obj.cardId+" div div").eq(0).append($('<div>')
                                 .addClass('col-md-2')
                                 .addClass('col-extend')
                         .append($('<canvas>')
				 .attr('title', obj.name) 
				 //.width(135).height(70)
				 .width(80).height(40)
				 .attr('id', id)
                                 .mousedown(function(e){
                                   onMouseDown(e);
                                 })));
      $("#"+id).before($('<div>')
		       .html(obj.name) 
		       .css('font-size', 'smaller')
		       .css('text-align', 'center'));
      $(window).mousemove(function(e){
                  onMouseMove(e);
               }) 
               .mouseup(function(e) {
                  onMouseUp(e);
                }); 
    } 
    // update elem 
    console.log($("#"+id));
    var ctx = $("#"+id)[0].getContext('2d'); 
    ctx.lineWidth = 30;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(150, 80, 60, 60 * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();

    if(obj.value >= 120) {
     if(obj.value >= 420) { obj.value = 420; }
     ctx.lineWidth = 29;
     ctx.strokeStyle = obj.color;
     ctx.beginPath();
     ctx.arc(150, 80, 60, obj.value * Math.PI / 180, 120 * Math.PI / 180, true);
     ctx.stroke();
    }
  }
}

// Controller
var originY = 0;
var currentValue = 0;
function onMouseDown(e) {
  var target = KnobModel.findById(e.currentTarget.id);
  target.turning = true;
  originY = e.clientY;
  currentValue = target.value;
}
function onMouseMove(e) {
  // idからmodelをfindしてmodelのメソッド呼び出し
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.changeValue((originY - e.clientY)*2 + currentValue);
    e.preventDefault();
  }
}
function onMouseUp(e) {
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.turning = false;
  } 
}
