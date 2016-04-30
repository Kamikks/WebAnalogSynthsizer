loadDialog = function() {
  $("#myModal").on('click', '.modal-footer .btn-primary', function() {
    $("#myModal").modal("hide");
    var selected = $("input[name=cardSelector]:checked").val();
    switch(selected) {
      case "sawtooth":
        var osc_name = 'SAW';
        var osc_type = SAW;
        break;
      case "square":
        var osc_name = 'SQUARE';
        var osc_type = SQUARE;
        break;
      case "sine":
        var osc_name = 'SINE';
        var osc_type = SINE;
        break;
    }
    switch(selected) {
      case "sawtooth":
      case "square":
      case "sine":
        var osc_id = osc.length;
        osc[osc_id] = new OscCard({deck: deck1, name: osc_name + osc_id, type: osc_type, color: '#477332'});
        keyboard[0].connect(osc[osc_id]);
        break;
      case "envelope":
        var env_id = env.length;
        env[env_id] = [];
        env[env_id][0] = new EnvCard({deck: deck2, name: 'ENV' + env_id, color: '#123457'});
        // add "connect to" entry
        $('#connectTo').append($('<option>').html('ENV' + env_id).val("ENV_" + env_id));
        break;
      case "lowpass":
      case "highpass":
      case "bandpass":
        var filter_id = filter.length; 
        filter[filter_id] = new FilterCard({deck: deck3, name: 'FILTER' + filter_id, type: LOWPASS, color: '#87da1a'});
        // add "connect to" entry
        $('#connectTo').append($('<option>').html('FILTER' + filter_id).val("FILTER_" + filter_id));
        break;
    }
  });
};
