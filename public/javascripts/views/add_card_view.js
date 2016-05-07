//Views
function createAddCardView() {
  $("#backPanel").append($('<div>')
                            .attr('id', 'addCardView')
                            .addClass('add-card-view')
                            .css('display', 'none')
                 );

  $.each(CARDLIST, function(i, card) {
    $("#addCardView").append($('<a>')
               .val(card)
               .attr('href', '#')
               .append($('<i>')
                           .addClass("fa fa-bars fa-lg")
                           .text(card)
               )
               .click(function(e) {
                 addCard($(e.currentTarget).val());
                 // switchAddCardView() must be called from model?
                 switchAddCardView();
               }) 
    )
  });
}

function switchAddCardView() {
  var decks = ["#deck1", "#deck2", "#deck3"];
  if($("#addCardView")[0] == null) {
    if($("#loadDeckView")[0]) { $("#loadDeckView").remove(); }
    createAddCardView();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'hide', opacity: 'hide'}, 'slow', function() {
        $(deck).css('display', 'none');
      });
    });
    $("#addCardView").animate({height: 'show', opacity: 'show'}, 'slow', function() {
      $("#addCardView").css('display', 'block');
    }); 
  } else {
    $("#addCardView").remove();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'show', opacity: 'show'}, 'slow', function() {
        $(deck).css('display', 'block');
      });
    });
  }
}

$(function() {
  $("#addCard").click(function() {
    switchAddCardView();
  });
});

