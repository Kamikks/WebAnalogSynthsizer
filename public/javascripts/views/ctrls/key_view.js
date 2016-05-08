// View
function updateKeys() {
}
function updateKey(id) {
  var supportTouch = 'ontouchend' in document;
  var obj = KeyModel.findById(id);

  if(obj) {
    if ($("#"+id)[0] == null) {
      // create view
      //console.log("supportTouch: " + supportTouch);
      if(supportTouch) {
        $("#" + obj.cardId).find(".row").append($('<canvas>')
                                                    .attr('id', id)
                                                    .on('touchstart', function(e) {
                                                      onTouchStartKey(e);
                                                    })
                                                    .on('touchend', function(e) {
                                                      onTouchEndKey(e);
                                                    })
                                        );
      } else {
        $("#" + obj.cardId).find(".row").append($('<canvas>')
                                                    .attr('id', id)
                                                    .on('mousedown', function(e) {
                                                      onMousedownKey(e);
                                                    })
                                                    .on('mouseup', function(e) {
                                                      onMouseupKey(e);
                                                    })
                                        );
      }
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

function onMousedownKey(e) {
  e.preventDefault();
  mousedownKey(e);
  $(e.currentTarget).on('mousemove', function(e) {
    mousemoveKey(e);
  });
}

function onMouseupKey(e) {
  mouseupKey(e);
  $(e.currentTarget).off('mousemove');
}

function onTouchStartKey(e) {
  e.preventDefault();
  touchstartKey(e);
  $(e.currentTarget).on('touchmove', function(e) {
    touchmoveKey(e);
  });
}

function onTouchEndKey(e) {
  touchendKey(e);
  $(e.currentTarget).off('touchmove');
}

