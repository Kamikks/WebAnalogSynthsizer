// View
function updateKeys() {
}
function updateKey(id) {
  var obj = KeyModel.findById(id);

  if(obj) {
    if ($("#"+id)[0] == null) {
      var card = ProtoCardModel.findById(obj.cardId);
      $("#"+obj.cardId).find(".row").append($('<div>')
                                 .addClass('col-md-2')
                                 .addClass('col-extend')
                         .append($('<webaudio-keyboard>')
				 .attr('keys', 15) 
                                 .attr('id', obj.id)
                                 .on('change', function(e) {
                                   onChange(e);
                                 })));
    } 
  }
}

