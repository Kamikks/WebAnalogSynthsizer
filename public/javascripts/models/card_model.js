// Model
function CardModel() {
  this.id = null;
  this.name = null;
  this.type = null;
  this.ctrlsId = [];
  this.prev = [];
  this.next = [];
  this.audioNode = null;
  this.color = "#000";
  this.parentId = null;
}

CardModel.list = [];

CardModel.add = function(params) {
  var obj = new CardModel()
  obj.id = params.id;
  obj.name = params.name;
  obj.type = params.type; 
  obj.ctrlsId = params.ctrlsId || [];
  obj.prev = params.prev;
  obj.next = params.next;
  obj.audioNode = params.audioNode;
  obj.color = params.color;
  obj.parentId = params.parentId;
  CardModel.list.push(obj);
  updateCard(obj.id);
  return obj;
}

CardModel.remove = function(id) {
  CardModel.list = $.grep(CardModel.list, function(obj) {
                     return id != obj.id;
                   });
  updateCards();
}

CardModel.findById = function(id) {
  return $.grep(CardModel.list, function(obj) {
           return id == obj.id;
         })[0];
}

CardModel.updateView= function() {
  //TODO
}

CardModel.prototype.addKnob = function(knobParams) {
  knobParams.cardId = this.id;
  var obj = KnobModel.add(knobParams);
  this.ctrlsId.push(obj.id);
}

CardModel.prototype.connect = function(obj) {
  var i = this.next.length;
  obj.prev.push(this.id);
  this.next[i] = obj.id;
}

CardModel.prototype.disconnect = function() {
  $.each(this.prev, function(id, item) {
    var prev = CardModel.findById(item);
    prev.next.splice(prev.next.indexOf(this.id), 1);
  });
}

CardModel.prototype.play = function() {
}

CardModel.prototype.stop = function() {
}

CardModel.prototype.updateView = function() {
    updateCard();
}

// View
function updateCards() {
  //cardのdomとイベントハンドラを追加、削除
}

function updateCard(id) {
  var obj = CardModel.findById(id); 
  if(obj == null) { return; }
  $("#"+obj.parentId).append($('<div>')
                               .addClass('card')
                               .attr('id', obj.id)
                               .attr('draggable', true)
                               .on('dragstart', function(e) {
                                 onDragStart(e); 
                               })
                               .on('dragenter', function(e) {
                                 onDragEnter(e);
                               })
                               .on('dragleave', function(e) {
                                 onDragLeave(e);
                               })
                               .on('dragover', function(e) {
                                 onDragOver(e);
                               })
                               .on('drop', function(e) {
                                 onDrop(e);
                               })
                               .append($('<div>')
                                        .addClass('card-header')
                                        .css('border-left', '10px solid ' + obj.color)
                                        .html(obj.name)
                                        .append($('<button>')
                                                  .attr('type', 'button')
                                                  .addClass('btn')
                                                  .addClass('btn-default')
                                                  .addClass('close-btn')))
                               .append($('<div>')
                                        .addClass('card-body') 
                                        .append($('<div>')
                                                  .addClass('row')
                                                  .addClass('row-extend'))));
}

var _tmpDrgId = null
function onDragStart(e) {
  $(e.currentTarget).css('opacity', '0.4');
  e.originalEvent.dataTransfer.effectAllowed = 'move';
  _tmpDrgId = e.currentTarget.id;
}

function onDragEnter(e) {
  if(_tmpDrgId != e.currentTargetId) {
    $(e.currentTarget).addClass('dragenter');
  }
}

function onDragLeave(e) {
  $(e.currentTarget).removeClass('dragenter');
}

function onDragOver(e) {
  if(e.preventDefault) {
    e.preventDefault();
  }
  e.originalEvent.dataTransfer.dropEffect = 'move';
}

function onDrop(e) {
  if(e.stopPropagation) {
    e.stopPropagation();
  }
  if(_tmpDrgId != e.currentTarget.id) {
    $(e.currentTarget).before($("#"+_tmpDrgId));
    $(e.currentTarget).removeClass('dragenter');
    $('#'+_tmpDrgId).css('opacity', '1.0');
  }
}

// Controller

function onConnect(e) {
  var obj = CardModel.findById(e.currentTarget.id)
  obj.connect(); 
}
