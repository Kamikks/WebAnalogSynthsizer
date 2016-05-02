// Controller
var originY = 0;
var currentValue = 0;
function onMouseDown(e) {
  var target = KnobModel.findById(e.currentTarget.id);
  target.turning = true;
  originY = e.clientY;
  currentValue = target.value;
}
function onMouseMove(e) {
  // idからmodelをfindしてmodelのメソッド呼び出し
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.changeValue((originY - e.clientY)*2 + currentValue);
    e.preventDefault();
  }
}
function onMouseUp(e) {
  var target = KnobModel.findByTurning(true); 
  if(target != null) {
    target.turning = false;
  } 
}
