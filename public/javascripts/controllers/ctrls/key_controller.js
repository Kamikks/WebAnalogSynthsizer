// Controller
function onChange(e) {
  var obj = KeyModel.findById(e.currentTarget.id);
  obj.changeValue(e.originalEvent.note[0], e.originalEvent.note[1]);
}
