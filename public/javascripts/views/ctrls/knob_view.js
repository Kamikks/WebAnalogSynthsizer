// View
function updateKnobs() {
  // TODO
}

function updateKnob(id) {
  var obj = KnobModel.findById(id);
  if (obj.size == LARGE) {
    var w = 150, h = 75; 
  } else {
    var w = 90, h = 45;
  }

  if(obj) {
    if ($("#"+id)[0] == null) {
      // create new elem
      var card = ProtoCardModel.findById(obj.cardId);
      //console.log($("#"+obj.cardId+" div div").eq(0));
      $("#"+obj.cardId).find(".row").append($('<div>')
                                 .addClass('col-md-2')
                                 .addClass('col-extend')
                         .append($('<canvas>')
				 .attr('title', obj.name) 
				 .width(w).height(h)
				 .attr('id', id)
                                 .mousedown(function(e){
                                   mousedownKnob(e);
                                 })
                                 .on('touchstart', function(e) {
                                   touchstartKnob(e);
                                 })));
      $("#"+id).before($('<div>')
		       .html(obj.name) 
		       .css('font-size', 'smaller')
		       .css('text-align', 'center'));
      $(window).mousemove(function(e){
                  mousemoveKnob(e);
               }) 
               .mouseup(function(e) {
                  mouseupKnob(e);
               }) 
               .on('touchmove', function(e) {
                  touchmoveKnob(e);
               })
               .on('touchend', function(e) {
                  touchendKnob(e);
               });
    } 
    // update elem 
    var ctx = $("#"+id)[0].getContext('2d'); 
    ctx.lineWidth = 40;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(150, 80, 40, 60 * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();

    if(obj.value <= 120) { obj.value = 120; }
    if(obj.value >= 420) { obj.value = 420; }
    ctx.lineWidth = 39;
    ctx.strokeStyle = obj.color;
    ctx.beginPath();
    ctx.arc(150, 80, 40, obj.value * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();
  }
}

