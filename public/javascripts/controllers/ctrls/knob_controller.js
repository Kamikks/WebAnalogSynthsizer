// Controller
var originY = 0;
var currentKnobValue = 0;
function mousedownKnob(e) {
  var target = KnobModel.findById(e.currentTarget.id);
  target.turning = true;
  originY = e.clientY;
  currentKnobValue = target.value;
}

function mousemoveKnob(e) {
  // idからmodelをfindしてmodelのメソッド呼び出し
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.changeValue((originY - e.clientY)*2 + currentKnobValue);
    e.preventDefault();
  }
}
function mouseupKnob(e) {
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.turning = false;
  } 
}

// Touch Event
function touchstartKnob(e) {
  var target = KnobModel.findById(e.currentTarget.id);
  target.turning = true;
  console.log(e);
  originY = e.originalEvent.changedTouches[0].clientY;
  currentKnobValue = target.value;
}

function touchmoveKnob(e) {
  // idからmodelをfindしてmodelのメソッド呼び出し
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.changeValue((originY - e.originalEvent.changedTouches[0].clientY)*2 + currentKnobValue);
    e.preventDefault();
  }
}

function touchendKnob(e) {
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.turning = false;
  } 
}
