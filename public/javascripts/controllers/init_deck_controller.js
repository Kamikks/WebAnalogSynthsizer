initDeck = function() {
  KnobModel.clear();
  KeyModel.clear();
  MidiselectorModel.clear();
  ProtoCardModel.clear();
  refreshCards();
  new DestCardModel({name: 'MASTER', color: '#878888'});
}
