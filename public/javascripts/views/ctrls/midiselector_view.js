function updateMidiselectors() {
  //TODO
}

function updateMidiselector(id) {
  var obj = MidiselectorModel.findById(id);
  if (obj) {
    if ($("#"+id)[0] == null) {
      $("#"+obj.cardId).find(".row").prepend($('<select>')
                                                .addClass('form-control input-sm midiselector')
                                                .attr('id', obj.id)
                                                .change(function(e) {
                                                   onMidiSelect(e);
                                                })
                                           );
      $.each(obj.inputs, function(i, input) {
        $("#"+obj.cardId).find(".form-control").append($('<option>')
                                                           .val(i)
                                                           .text(input.name)
                                                      )
      });
    }
  }
}

function onMidiSelect(e) {
  var obj = MidiselectorModel.findById(e.currentTarget.id);
  var i = $(e.currentTarget).val()
//  console.log($(obj.inputs[i]));
  // cancel all event handler
  $.each(obj.inputs, function(i, input) {
    $(input).off('midimessage');
  });
  $(obj.inputs[i]).on('midimessage', function(e) {
    // onMidimessage( noteon/off, notenumber)
    onMidimessage(obj.id, e.originalEvent.data);
//    console.log(e.originalEvent);
  });
}
