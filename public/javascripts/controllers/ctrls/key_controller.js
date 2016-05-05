// Controller
function onChange(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  obj.changeValue(e.originalEvent.note[0], e.originalEvent.note[1]);
}

function onKeydown(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  var noteNum = 0;
  //console.log("offsetX: " + e.offsetX + ", offsetY: " + e.offsetY);  
  $.each(obj.keys, function(i, key) {
    if (key.x <= e.offsetX && e.offsetX < key.x + key.w &&
        key.y <= e.offsetY && e.offsetY <= key.y + key.h) {
        noteNum = key.note;
        if (key.black) {return false;}
    }
  });
  obj.changeValue(true, noteNum);
}

// TODO dragenter must down key 
function onKeymove(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  $.each(obj.keys, function(i, key) {
    if(key.on) {
      if (key.x > e.offsetX || e.offsetX >= key.x + key.w ||
          key.y > e.offsetY || e.offsetY > key.y + key.h) {
          // TODO multi touch
          obj.changeValue(false, key.note);
      }
    }
  });
  //onKeydown(e);
}

function onKeyup(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  $.each(obj.keys, function(i, key) {
    if(key.on) {
      if (key.x <= e.offsetX && e.offsetX < key.x + key.w &&
          key.y <= e.offsetY && e.offsetY <= key.y + key.h) {
          obj.changeValue(false, key.note);
          return false;
      }
    }
  });
}
