//Views
function createLoadDeckView(presetList) {
  console.log("createLoadDeckView");
  $("#backPanel").append($('<div>')
                            .attr('id', 'loadDeckView')
                            .addClass('add-card-view')
                            .css('display', 'block')
                 );

  $("#closeView").addClass('close-view')
                 .append($('<a>')
                     .attr('id', 'closeButton')
                     .attr('href', '#')
                     .text('CLOSE')
                     .click(function(e) {
                       switchLoadDeckView();
                     }) 
  );

  $.each(presetList.presetList, function(i, preset) {
    $("#loadDeckView").append($('<a>')
               .val(preset)
               .attr('href', '#')
               .text(preset)
               .click(function(e) {
                 patchFile = "../../presets/" + $(e.currentTarget).val() + ".patch";
                 console.log($.getJSON(patchFile));
                 $.getJSON(patchFile, function(data){
			loadDeck(data);
		 });
                 // switchAddCardView() must be called from model?
                 switchLoadDeckView();
               }) 
    )
    .animate({height: 'show'})
  });
}

function switchLoadDeckView() {
  console.log("switch load deck view");
  var decks = ["#deck1", "#deck2", "#deck3"];
  if($("#loadDeckView")[0] == null) {
    $("#addCardView").remove();
    $("#saveDeckView").remove();
    $("#closeButton").remove();
    $("#saveButton").remove();
    $.each(decks, function(i, deck) {
      $(deck).hide();
    });
    $("#loadDeckView").animate({height: 'show', opacity: 'show'}, 'slow');
    $("#openMenu").prop('checked', false);
    sendGetPresetListRequest();
  } else {
    $("#loadDeckView").remove();
    $("#closeButton").remove();
    $.each(decks, function(i, deck) {
      $(deck).show();
    });
  }
}

function sendGetPresetListRequest() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    switch(xhr.readyState) {
      case 4:
        if(xhr.status == 200) {
          createLoadDeckView(this.response);
        }
    }
  }

  xhr.open('GET', '/presets', true);
  xhr.responseType = 'json';
  xhr.send(null); 
}

$(function() {
  $("#loadDeck").click(function() {
    switchLoadDeckView();
  });
});

