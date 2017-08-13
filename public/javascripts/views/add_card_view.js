//Views
function createAddCardView() {
  console.log("create add card view");
  $("#backPanel").append($('<div>')
                            .attr('id', 'addCardView')
                            .addClass('add-card-view')
                            .css('display', 'none')
                 );
  $("#closeView").addClass('close-view')
                 .append($('<a>')
                     .attr('id', 'closeButton')
                     .attr('href', '#')
                     .text('CLOSE')
                     .click(function(e) {
                       switchAddCardView();
                     }) 
  );

  $.each(CARDLIST, function(i, card) {
    $("#addCardView").append($('<a>')
               .val(card)
               .attr('href', '#')
               .text(card)
               .css('background', COLOR[card])
               .click(function(e) {
                 addCard($(e.currentTarget).val());
                 // switchAddCardView() must be called from model?
                 switchAddCardView();
               }) 
    )
  });
}

function switchAddCardView() {
  console.log("switch add card view");
  var decks = ["#deck1", "#deck2", "#deck3"];
  if($("#addCardView")[0] == null) {
    $("#loadDeckView").remove();
    $("#saveDeckView").remove();
    $("#closeButton").remove();
    $("#saveButton").remove();
    createAddCardView();
    $.each(decks, function(i, deck) {
      $(deck).hide();
    });
    $("#addCardView").animate({height: 'show', opacity: 'show'}, 'slow');
    $("#openMenu").prop('checked', false);
  } else {
    $("#addCardView").remove();
    $("#closeButton").remove();
    $.each(decks, function(i, deck) {
      $(deck).show();
    });
  }
}

$(function() {
  $("#addCard").click(function() {
    switchAddCardView();
  });
});

