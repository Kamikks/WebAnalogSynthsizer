//Views
//		  	<button id="saveDeck" title="Save deck" type="button" class="btn btn-primary btn-margin">
//			<i class="fa fa-floppy-o fa-lg"></i>
//		</button>
//		</div>
//		<div class="btn-menu">
//		  <input id="presetLabel" type="text" name="preset-name" class="preset-label">
//		</div>-->

function createSaveDeckView() {
  console.log("create save deck view");
  $("#backPanel").append($('<div>')
                            .attr('id', 'saveDeckView')
                            .addClass('save-deck-view')
                            .css('display', 'none')
                            .append($('<input>')
                                       .attr('id', 'presetLabel')
                                       .attr('type', 'text')
                                       .attr('name', 'preset-name')
                                       .addClass('preset-label')
                            )
                 );

  $("#closeView").addClass('close-view')
                 .append($('<ul>')
                     .append($('<li>')
                         .append($('<a>')
                             .attr('id', 'saveButton')
                             .attr('href', '#')
                             .text('SAVE')
                             .click(function(e) {
                               saveDeck();
                               switchSaveDeckView();
                             }) 
                         )
                     )
                     .append($('<li>')
                         .append($('<a>')
                             .attr('id', 'closeButton')
                             .attr('href', '#')
                             .text('CLOSE')
                             .css('background', '#333')
                             .click(function(e) {
                               switchSaveDeckView();
                             }) 
                         )
                     )
                );
}

function switchSaveDeckView() {
  var decks = ["#deck1", "#deck2", "#deck3"];
  if($("#saveDeckView")[0] == null) {
    if($("#loadDeckView")[0]) { $("#loadDeckView").remove(); }
    createSaveDeckView();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'hide', opacity: 'toggle'}, 'slow');
    });
    $("#saveDeckView").animate({height: 'show', opacity: 'show'}, 'slow');
    $("#openMenu").prop('checked', false);
  } else {
    $("#saveDeckView").remove();
    $("#closeButton").remove();
    $("#saveButton").remove();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'show', opacity: 'show'}, 'slow');
    });
  }
}

$(function() {
  $("#saveDeck").click(function() {
    switchSaveDeckView();
  });
});
