// View
function updateCards() {
  // update dropdown list
  // add new entry to "connect to"  option
//  $.each(ProtoCardModel.list, function(i, obj) {
//    var dropdownMenu = $("#"+obj.id).find(".dropdown-menu")
//    $.each(dropdownMenu.children, function(i, child) {
//      child.remove();
//    });
//    $.each(ProtoCardModel.list, function(j, obj) {
//      dropdownMenu.append($('<li>')
//                              .attr('role', 'presentation')
//                              .append($('<a>')
//                                          .html(obj.name)
//                              )
//                         );
//    });
//  });
}

function updateCard(id) {
  var obj = ProtoCardModel.findById(id); 
  if(obj == null) {
    // delete view if exists
    if($("#"+id)) {
      $("#"+id).remove();
    } 
    return;
  }
  if($("#"+obj.id)[0] == null) {
    // create new card element
    $("#"+obj.deckId).append($('<div>')
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
                                                       .addClass('btn btn-default btn-extend')
                                                       .click(function(e) {
                                                         onCardClose($(e.currentTarget).parents('.card')[0].id);
                                                       })
                                             )
                                             .append($('<div>')
                                                       .addClass('dropdown dropdown-extend')
                                                       .append($('<button>')
                                                                 .attr('type', 'button')
                                                                 .addClass('btn btn-default dropdown-toggle btn-extend')
                                                                 .attr('data-toggle', 'dropdown')
                                                                 .click(function(e) {
                                                                   onAccordion(e);
                                                                 })
                                                       )
//                                                         .append($('<ul>')
//                                                                   .addClass('dropdown-menu')
//                                                                   .attr('role', 'menu')
//                                                                   .append($('<li>')
//                                                                             .attr('role', 'presentation')
//                                                                             .append($('<a>')
//                                                                                        .html("test")
//                                                                             )
//                                                                   )
//                                                         )
                                             )
                                             .append($('<button>')
                                                       .attr('type', 'button')
                                                       .addClass('btn btn-default btn-extend')
                                                       .click(function(e) {
                                                         onSwitchSendtoSelector(e);
                                                       })
                                             )
                                 )
                            );
  }
  //update card header and body
  $("#"+obj.id).find('.card-body').remove();
  $("#"+obj.id).append($('<div>')
                          .addClass('card-body') 
                          .append($('<div>')
                                     .addClass('row')
                                     .addClass('row-extend')));

   //update ctrls
  $.each(obj.ctrls, function(i, ctrl) {
    switch(ctrl.type) {
      case KNOB_CTRL:
        updateKnob(ctrl.id);
        break;
      case KEY_CTRL:
        updateKey(ctrl.id);
        break;
    } 
  });
}

function switchToSelector(id) {
  // TODO if this is key card, don't display selector
  var cardBody = $("#"+id).find(".card-body");
  cardBody.append($('<div>')
                      .addClass('btn-group body-sendto')
                      .attr('data-toggle', 'buttons')
                      .on('DOMNodeInserted', function(e) {
                        var target = $(e.target);
                        setTimeout( function() {
                          target.addClass('bg-sendto');
                        }, 10);
                      })
                 );
  var btnGroup = cardBody.children(".btn-group");
  $.each(ProtoCardModel.list, function(i, obj) {
    if(obj.type != KEY && obj.id != id) {
      btnGroup.append($('<label>')
		  .addClass('btn btn-primary btn-sendto-select')
		  .html(obj.name)
                  .click(function(e) {
                    onSelectSendto(e);
                  })
		  .append($('<input>')
			      .attr('type', 'radio')
			      .attr('name', 'sendtoSelector')
			      .val(obj.name)
		  )
      );
    }
  });
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

function onAccordion(e) {
  var cardBody = $(e.currentTarget).parents(".card").find(".card-body");
  if(cardBody.children(".row")[0]) {
    cardBody.children().remove();
  } else {
    updateCard($(e.currentTarget).parents(".card")[0].id);
  }
}

function onSwitchSendtoSelector(e) {
  var cardBody = $(e.currentTarget).parents(".card").find(".card-body");
  if(cardBody.children(".row")[0]) {
    cardBody.children().remove();
    switchToSelector($(e.currentTarget).parents(".card")[0].id);
  } else {
    cardBody.children().remove();
    updateCard($(e.currentTarget).parents(".card")[0].id);
  }
}
