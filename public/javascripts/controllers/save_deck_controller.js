var saveDeck = function() {
  var name = $("#presetLabel").val();
  console.log("save " + name + "preset!!");
  var result = [];
  $.each(ProtoCardModel.list, function(i, obj) {
    if(obj.type != DEST) {
      var data = obj.convertObj();
      result.push(data);
    }
  });
  var json =  JSON.stringify(result);
  $.ajax({
    url: "/presets/" + name,
    type: "POST",
    contentType: "application/json",
    data: json
  }); 
}
