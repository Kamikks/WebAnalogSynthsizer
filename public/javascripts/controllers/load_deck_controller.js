var saveDeck = function() {
  var result = [];
  $.each(ProtoCardModel.list, function(i, obj) {
    if(obj.type != DEST) {
      var data = obj.convertObj();
      result.push(data);
    }
  });
  return JSON.stringify(result);
}

var loadDeck = function(json) {
  initDeck();
  var card = null;
  var objList = $.parseJSON(json);
  // create all object
  $.each(objList, function(i, obj) {
    switch(obj.type) {
      case SAW:
      case SQUARE:
      case SINE:
        card = new OscCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
        $.each(obj.ctrls, function(i, ctrl) {
          card.ctrls[ctrl.key].changeValue(ctrl.value);
        });
        break;
      case ADSR:
        card = new AdsrCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
        $.each(obj.ctrls, function(i, ctrl) {
          card.ctrls[ctrl.key].changeValue(ctrl.value);
        });
        break;
      case LOWPASS:
      case HIGHPASS:
      case BANDPASS:
      case LOWSHELF:
      case HIGHSHELF:
      case PEACKING:
      case NOTCH:
        card = new FilterCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
        $.each(obj.ctrls, function(i, ctrl) {
          card.ctrls[ctrl.key].changeValue(ctrl.value);
        });
        break;
      case KEY:
        card = new KeyCardModel({id: obj.id, type: obj.type, color: obj.color, deckId: obj.deckId});
        break;
    }
  }); 
  // connect
  // TODO merge to sendtoSelect() at proto_card_controller.js
  $.each(objList, function(i, obj) {
    $.each(obj.next, function(j, nextId) {
      var sendFrom = ProtoCardModel.findById(obj.id);
      var sendTo = ProtoCardModel.findById(nextId);
      if(sendTo.type == ADSR && sendTo.prev.length > 0) {
        sendTo = new AdsrCardModel({obj: sendTo});
      }
      if(sendFrom.type != KEY) {
        sendFrom.disconnect({oneway: true});
      }
      sendFrom.connect(sendTo);
    }); 
  });
}
