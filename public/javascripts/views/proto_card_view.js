// View
function refreshCards() {
  var deck = ["deck1", "deck2", "deck3"];
  for(var i=0; i<deck.length; i++) {
    $.each($("#" + deck[i]).children("div"), function(i, card) {
      $(card).remove();
    });
  }
  $.each(ProtoCardModel.list, function(i, obj) {
    updateCard(obj.id);
  });
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
                                                       .attr('title', 'Delete this Card')
                                                       .addClass('btn btn-default btn-extend close-btn')
                                                       .click(function(e) {
                                                         onCardClose($(e.currentTarget).parents('.card')[0].id);
                                                       })
                                                       //.append($('<i>')
                                                       //            .addClass('fa fa-power-off')
                                                       //) 
                                             )
                                             .append($('<button>')
                                                       .attr('type', 'button')
                                                       .attr('title', 'Minimize')
                                                       .addClass('btn btn-default btn-extend')
                                                       .attr('data-toggle', 'dropdown')
                                                       .click(function(e) {
                                                         onAccordion(e);
                                                       })
                                             )
                                             .append($('<button>')
                                                       .attr('type', 'button')
                                                       .addClass('btn btn-default btn-extend')
                                                       .attr('title', 'Connect Card')
                                                       .click(function(e) {
                                                         switchSendtoSelectorView(e);
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
      case MIDI_CTRL:
        updateMidiselector(ctrl.id); 
        break;
    } 
  });
}

function createSendtoSelectorView(id) {
  // TODO if this is key card, don't display selector
  var obj = ProtoCardModel.findById($("#"+id)[0].id);
  var cardBody = $("#"+id).find(".card-body");
  var sendtoSelector = $('<div>').addClass('sendto-selector-view')
                           .css('display', 'none');
  // keyboard is always connected to all osc card. 
  if(obj.type != KEY && obj.type != DEST) {
    $.each(ProtoCardModel.list, function(i, target) {
      if(target.type != KEY && target.id != id) {
        sendtoSelector.append($('<a>')
                    .val(target.name)
                    .click(function(e) {
                      sendtoSelect(obj.id, $(e.currentTarget).val());
                      switchSendtoSelectorView(e);
                    })
  		    .append($('<i>')
                              .addClass("fa fa-sticky-note-o")
  			      .text(target.name)
  		    )
                );
      }
    });
    $.each(sendtoSelector.find("i"), function(i, label) {
      $.each(obj.next, function(j, next) {
        if(next.name == $(label).text()) {
          $(label).removeClass("fa-sticky-note-o");
          $(label).addClass("fa-arrow-right active");
        }
      }); 
    });
  }
  cardBody.append(sendtoSelector);
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
  cardBody.animate({height: 'toggle', opacity: 'toggle'}, 'slow');
}

function switchSendtoSelectorView(e) {
  var cardBody = $(e.currentTarget).parents(".card").find(".card-body");
  if(cardBody.children(".sendto-selector-view")[0] == null) {
    createSendtoSelectorView($(e.currentTarget).parents(".card")[0].id);
    cardBody.children(".row").animate({width: 'hide', height: 'hide', opacity: 'hide'}, 'slow', function() {
      cardBody.children(".row").css('display', 'none');
    });
    cardBody.children(".sendto-selector-view").animate({width: 'show', height: 'show', opacity: 'show'}, 'slow', function() {
      cardBody.children(".sendto-selector-view").css('display', 'block');
    });
  } else {
    cardBody.children(".sendto-selector-view").remove();
    cardBody.children(".row").animate({width: 'show', height: 'show', opacity: 'show'}, 'slow', function() {
      cardBody.children(".row").css('display', 'block');
    });
  }
}
