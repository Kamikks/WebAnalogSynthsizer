$(function() {
  $("#initDeck").click(function() {
    var decks = ["#deck1", "#deck2", "#deck3"];
    initDeck();
    $("#openMenu").prop('checked', false);
    $("#saveDeckView").remove();
    $("#loadDeckView").remove();
    $("#addCardView").remove();
    $("#closeButton").remove();
    $("#saveButton").remove();
    $.each(decks, function(i, deck) {
      $(deck).show();
    });
  });
});
