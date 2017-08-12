//Views
function createLoadDeckView(presetList) {
  console.log("createLoadDeckView");
  $("#backPanel").append($('<div>')
                            .attr('id', 'loadDeckView')
                            .addClass('add-card-view')
                            .css('display', 'block')
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
    if($("#addCardView")[0]) { $("#addCardView").remove() };
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'hide', opacity: 'toggle'}, 'slow');
    });
    $("#loadDeckView").animate({height: 'show', opacity: 'toggle'}, 'slow');
    sendGetPresetListRequest();
  } else {
    $("#loadDeckView").remove();
    $.each(decks, function(i, deck) {
      $(deck).animate({height: 'show', opacity: 'show'}, 'slow');
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

