//Views
function createLoadDeckView() {
  $("#backPanel").append($('<div>')
                            .attr('id', 'loadDeckView')
                            .addClass('add-card-view')
                            .css('display', 'none')
                 );

  for(var key in defaultPatch) {
    $("#loadDeckView").append($('<a>')
               .val(key)
               .attr('href', '#')
               .append($('<i>')
                           .addClass("fa fa-bars fa-lg")
                           .text(key)
               )
               .click(function(e) {
                 loadDeck(defaultPatch[$(e.currentTarget).val()]);
                 // switchAddCardView() must be called from model?
                 switchLoadDeckView();
               }) 
    )
  };
}

function switchLoadDeckView() {
  var decks = ["#deck1", "#deck2", "#deck3"];
  if($("#loadDeckView")[0] == null) {
    if($("#addCardView")[0]) { $("#addCardView").remove() };
    createLoadDeckView();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'hide', opacity: 'hide'}, 'slow', function() {
        $(deck).css('display', 'none');
      });
    });
    $("#loadDeckView").animate({height: 'show', opacity: 'show'}, 'slow', function() {
      $("#loadDeckView").css('display', 'block');
    }); 
  } else {
    $("#loadDeckView").remove();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'show', opacity: 'show'}, 'slow', function() {
        $(deck).css('display', 'block');
      });
    });
  }
}

$(function() {
  $("#loadDeck").click(function() {
    switchLoadDeckView();
  });
});

