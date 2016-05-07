// Controller
function onCardClose(id) {
  var obj = ProtoCardModel.findById(id);
  if(obj.type != DEST) {
    obj.disconnect({}); 
    // delete from ProtoCardModel.list
    ProtoCardModel.remove(obj.id);
  }
}

function sendtoSelect(sendfromId, sendtoId) {
  var sendFrom = ProtoCardModel.findById(sendfromId);
  var sendTo = ProtoCardModel.findById(sendtoId);
  if(sendTo.type == ADSR && sendTo.prev.length > 0) {
    // copy sendTo
    //console.log(sendTo);
    sendTo = new AdsrCardModel({obj: sendTo});
  }
  console.log("sendFrom: " + sendFrom.name);
  sendFrom.disconnect({oneway: true});
  sendFrom.connect(sendTo);
}

function dropCard(targetId, dropToId) {
  //TODO
}

