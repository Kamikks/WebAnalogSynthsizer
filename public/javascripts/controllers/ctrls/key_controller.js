// Controller
function onChange(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  obj.changeValue(e.originalEvent.note[0], e.originalEvent.note[1]);
}

function mousedownKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var x = e.offsetX;
  var y = e.offsetY;
  var noteNum = 0;
  //console.log("offsetX: " + e.offsetX + ", offsetY: " + e.offsetY);  
  $.each(obj.keys, function(i, key) {
    if (key.x <= x && x < key.x + key.w &&
        key.y <= y && y <= key.y + key.h) {
        noteNum = key.note;
        if (key.black) {return false;}
    }
  });
  obj.changeValue(true, noteNum);
}

function mousemoveKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var x = e.offsetX;
  var y = e.offsetY;

  var currentKey = null;
  $.each(obj.keys, function(i, key) {
    if (key.x <= x && x < key.x + key.w &&
        key.y <= y && y <= key.y + key.h) {
        currentKey = key;
        if (key.black) {return false;}
    }
  });
  if(currentKey.on == false) {
    var releaseKey = $.grep(obj.keys, function(key) {
                       return key.on == true;
                     })[0];
    obj.changeValue(false, releaseKey.note);
    obj.changeValue(true, currentKey.note);
  }

}

function mouseupKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var x = e.offsetX;
  var y = e.offsetY;

  $.each(obj.keys, function(i, key) {
    if(key.on) {
      if (key.x <= x && x < key.x + key.w &&
          key.y <= y && y <= key.y + key.h) {
          obj.changeValue(false, key.note);
          return false;
      }
    }
  });
}

function touchstartKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var noteNum = 0;
  var rect = $(e.currentTarget)[0].getBoundingClientRect();
  var ofsX = rect.left + window.pageXOffset;
  var ofsY = rect.top + window.pageYOffset;
  var x = e.originalEvent.changedTouches[0].pageX - ofsX;
  var y = e.originalEvent.changedTouches[0].pageY - ofsY;
  //console.log("x: " + x + ", y: " + y);
  $.each(obj.keys, function(i, key) {
    if (key.x <= x && x < key.x + key.w &&
        key.y <= y && y <= key.y + key.h) {
        noteNum = key.note;
        if (key.black) {return false;}
    }
  });
  obj.changeValue(true, noteNum);
}

function touchmoveKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var rect = $(e.currentTarget)[0].getBoundingClientRect();
  var ofsX = rect.left + window.pageXOffset;
  var ofsY = rect.top + window.pageYOffset;
  var x = e.originalEvent.changedTouches[0].pageX - ofsX;
  var y = e.originalEvent.changedTouches[0].pageY - ofsY;

  var currentKey = null;
  $.each(obj.keys, function(i, key) {
    if (key.x <= x && x < key.x + key.w &&
        key.y <= y && y <= key.y + key.h) {
        currentKey = key;
        if (key.black) {return false;}
    }
  });
  if(currentKey.on == false) {
    var releaseKey = $.grep(obj.keys, function(key) {
                       return key.on == true;
                     })[0];
    obj.changeValue(false, releaseKey.note);
    obj.changeValue(true, currentKey.note);
  }

}

function touchendKey(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var rect = $(e.currentTarget)[0].getBoundingClientRect();
  var ofsX = rect.left + window.pageXOffset;
  var ofsY = rect.top + window.pageYOffset;
  var x = e.originalEvent.changedTouches[0].pageX - ofsX;
  var y = e.originalEvent.changedTouches[0].pageY - ofsY;

  $.each(obj.keys, function(i, key) {
    if(key.on) {
      if (key.x <= x && x < key.x + key.w &&
          key.y <= y && y <= key.y + key.h) {
          obj.changeValue(false, key.note);
          return false;
      }
    }
  });
}

