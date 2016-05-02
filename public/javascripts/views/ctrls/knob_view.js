// View
function updateKnobs() {
  // TODO
}

function updateKnob(id) {
  var obj = KnobModel.findById(id);
  if (obj.size == LARGE) {
    var w = 128, h = 64; 
  } else {
    var w = 60, h = 30;
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
                                   onMouseDown(e);
                                 })));
      $("#"+id).before($('<div>')
		       .html(obj.name) 
		       .css('font-size', 'smaller')
		       .css('text-align', 'center'));
      $(window).mousemove(function(e){
                  onMouseMove(e);
               }) 
               .mouseup(function(e) {
                  onMouseUp(e);
                }); 
    } 
    // update elem 
    var ctx = $("#"+id)[0].getContext('2d'); 
    ctx.lineWidth = 30;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(150, 80, 30, 60 * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();

    if(obj.value <= 120) { obj.value = 120; }
    if(obj.value >= 420) { obj.value = 420; }
    ctx.lineWidth = 29;
    ctx.strokeStyle = obj.color;
    ctx.beginPath();
    ctx.arc(150, 80, 30, obj.value * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();
  }
}

