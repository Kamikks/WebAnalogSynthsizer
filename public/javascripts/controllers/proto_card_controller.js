// Controller
function onCardClose(id) {
  var obj = ProtoCardModel.findById(id);
  obj.disconnect({}); 
  // delete from ProtoCardModel.list
  ProtoCardModel.remove(obj.id);
}

function onSelectSendto(e) {
  var sendFrom = ProtoCardModel.findById($(e.currentTarget).parents(".card")[0].id);
  var sendTo = ProtoCardModel.findById($(e.currentTarget).children("input").val());
  if(sendTo.type == ADSR && sendTo.prev.length > 0) {
    // copy sendTo
    //console.log(sendTo);
    sendTo = new AdsrCardModel({obj: sendTo});
  }
  console.log("sendFrom: " + sendFrom.name);
  sendFrom.disconnect({oneway: true});
  sendFrom.connect(sendTo);
}

function onConnect(e) {
  //TODO
  var obj = ProtoCardModel.findById(e.currentTarget.id)
  obj.connect(); 
}
