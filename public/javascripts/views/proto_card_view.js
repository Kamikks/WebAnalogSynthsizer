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
  if($("#" + id)[0]) {
    if(obj == null) {
    // delete view if object is already deleted or object move to other deck.
      $("#" + id).remove();
    } 
    return;
  }
  if($("#"+obj.id)[0] == null) {
    // create new card element if there is no view
    $("#"+obj.deckId).sortable({cursor: 'move', handle: ".card-header"}).append($('<div>')
                                 .addClass('card')
                                 .attr('id', obj.id)
                                 .draggable({cursor: 'move', handle: ".card-header", connectToSortable: $('.deck'),
                                            stop: function() {
                                              $(this).css({height: 'inherit'});
                                            }})
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
      if(target.type != KEY && target.id != id && target.type != SAW &&
         target.type != SQUARE && target.type != SINE) {
        sendtoSelector.append($('<a>')
                    .val(target.name)
                    .click(function(e) {
                      sendtoSelect(obj.id, $(e.currentTarget).val());
                      switchSendtoSelectorView(e);
                    })
  		    .append($('<i>')
  			      .text(target.name)
  		    )
                );
      }
    });
    $.each(sendtoSelector.find("i"), function(i, label) {
      $.each(obj.next, function(j, next) {
        if(next.id == $(label).text()) {
          $(label).parents("a").addClass("active");
          $(label).addClass("fa fa-arrow-right");
        }
      }); 
    });
  }
  cardBody.append(sendtoSelector);
}

function onAccordion(e) {
  var cardBody = $(e.currentTarget).parents(".card").find(".card-body");
  console.log(cardBody);
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
