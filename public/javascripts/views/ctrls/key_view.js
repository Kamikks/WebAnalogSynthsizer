// View
function updateKeys() {
}
function updateKey(id) {
  var obj = KeyModel.findById(id);

  if(obj) {
    if ($("#"+id)[0] == null) {
//      $("#"+obj.cardId).find(".row").append($('<div>')
//                                 .addClass('col-md-2')
//                                 .addClass('col-extend')
//                         .append($('<webaudio-keyboard>')
//				 .attr('keys', 15) 
//                                 .attr('id', obj.id)
//                                 .on('change', function(e) {
//                                   onChange(e);
//                                 })));
      // create view
      $("#" + obj.cardId).find(".row").append($('<canvas>')
                                                  .attr('id', id)
                                                  .mousedown(function(e) {
                                                    e.preventDefault();
                                                    onKeydown(e);
                                                  })
                                                  .on('mousemove', function(e) {
                                                    onKeymove(e);
                                                  })
                                                  .mouseup(function(e) {
                                                    onKeyup(e);
                                                  })
                                      );
    } 
    // update view
    var ctx = $("#" + id)[0].getContext('2d');
    ctx.beginPath();
    $.each(obj.keys, function(i, key) {
      if(key.black == false) {
        if(key.on) {
          ctx.fillStyle = 'rgb(100, 0, 0)';
        } else {
          ctx.fillStyle = 'rgb(255, 255, 255)';
        }
       // ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(key.x, key.y, key.w, key.h);
        ctx.strokeRect(key.x, key.y, key.w, key.h);
      }
    });
    $.each(obj.keys, function(i, key) {
      if(key.black) {
        if(key.on) {
          ctx.fillStyle = 'rgb(100, 0, 0)';
        } else {
          ctx.fillStyle = 'rgb(0, 0, 0)';
        }
        ctx.fillRect(key.x, key.y, key.w, key.h);
      }
    });
    ctx.stroke();
  }
}

