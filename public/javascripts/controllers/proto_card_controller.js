// Controller
function onCardClose(id) {
  var obj = ProtoCardModel.findById(id);
  if(obj.type == KEY) {
    obj.disconnect({oneway: true});
    ProtoCardModel.remove(obj.id);
  } else if(obj.type != DEST) {
    obj.disconnect({}); 
    // delete from ProtoCardModel.list
    ProtoCardModel.remove(obj.id);
  }
}

function sendtoSelect(sendfromId, sendtoId) {
  var sendFrom = ProtoCardModel.findById(sendfromId);
  var sendTo = ProtoCardModel.findById(sendtoId);
  if(sendFrom.isConnected(sendTo)) {
    console.log("disconnect from " + sendFrom.name + " to " + sendTo.name);
    sendFrom.disconnect({next: sendTo});
  } else {
    if(sendTo.type == ADSR && sendTo.prev.length > 0) {
      // copy sendTo
      sendTo = new AdsrCardModel({obj: sendTo});
    }
    console.log("sendFrom: " + sendFrom.name);
    sendFrom.connect(sendTo);
  }
}

function dropCard(targetId, dropToId) {
  //TODO
}

