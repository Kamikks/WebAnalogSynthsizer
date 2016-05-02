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
      //new FilterCard({deck: deck3, name: 'FILTER' + filter_id, type: LOWPASS, color: '#87da1a'});
      break;
  }
};
