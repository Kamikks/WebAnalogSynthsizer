function onMidimessage(id, data) {
  var obj = MidiselectorModel.findById(id);
  noteNum = data[1];
  switch(data[0] & 0xf0) {
    case 0x90:
      obj.noteon(noteNum);
      break;
    case 0x80:
      obj.noteoff(noteNum);
      break;
  }

}
