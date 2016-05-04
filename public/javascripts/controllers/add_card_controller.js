//Controller
addCard = function(selected) {
  switch(selected) {
    case "sawtooth":
      var oscName = 'SAW';
      var oscType = SAW;
      break;
    case "square":
      var oscName = 'SQUARE';
      var oscType = SQUARE;
      break;
    case "sine":
      var oscName = 'SINE';
      var oscType = SINE;
      break;
  }
  switch(selected) {
    case "sawtooth":
    case "square":
    case "sine":
      var osc = new OscCardModel({name: oscName, type: oscType, color: '#477332'});
      $.each(ProtoCardModel.findByType(KEY), function(i, obj) {
        obj.connect(osc);
      });
      break;
    case "envelope":
      new AdsrCardModel({name: 'ENV', color: '#123457'});
      break;
    case "lowpass":
    case "highpass":
    case "bandpass":
      new FilterCardModel({name: 'FILTER', type: LOWPASS, color: '#87da1a'});
      break;
    case "keyboard":
      if(ProtoCardModel.findByType(KEY).length > 0) { 
        // only one KeyCardModel can be added.
        break; 
      }
      var key = new KeyCardModel({name: 'KEYBOARD', color: '#123125'});
      var osc = [SAW, SINE, SQUARE];
      $.each(osc, function(i, type) {
        $.each(ProtoCardModel.findByType(type), function(j, sendTo) {
          key.connect(sendTo);
        });
      }); 
      break;
  }
};
