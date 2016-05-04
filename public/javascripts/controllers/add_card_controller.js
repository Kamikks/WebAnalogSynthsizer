//Controller
addCard = function(selected) {
  switch(selected) {
    case SAW:
    case SQUARE:
    case SINE:
      var osc = new OscCardModel({name: selected.toUpperCase(), type: selected, color: '#477332'});
      $.each(ProtoCardModel.findByType(KEY), function(i, obj) {
        obj.connect(osc);
      });
      break;
    case ADSR:
      new AdsrCardModel({name: selected.toUpperCase(), color: '#123457'});
      break;
    case LOWPASS:
    case HIGHPASS:
    case BANDPASS:
    case LOWSHELF:
    case HIGHSHELF:
    case PEACKING:
    case NOTCH:
      new FilterCardModel({name: selected.toUpperCase(), type: selected, color: '#87da1a'});
      break;
    case KEY:
      if(ProtoCardModel.findByType(KEY).length > 0) { 
        // only one KeyCardModel can be added.
        break; 
      }
      var key = new KeyCardModel({name: selected.toUppercase(), color: '#123125'});
      var osc = [SAW, SINE, SQUARE];
      $.each(osc, function(i, type) {
        $.each(ProtoCardModel.findByType(type), function(j, sendTo) {
          key.connect(sendTo);
        });
      }); 
      break;
  }
};
