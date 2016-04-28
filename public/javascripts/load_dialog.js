loadDialog = function() {
  $("#myModal").on('click', '.modal-footer .btn-primary', function() {
    $("#myModal").modal("hide");
    var selected = $("input[name=cardSelector]:checked").val();
    // send[0]: type, send[1]: id
    var send = $("#connectTo").val().split("_");
    send[1] = parseInt(send[1], 10);
    console.log(send[1]);
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
        osc[osc_id] = new OscCard(deck1, osc_name + osc_id, osc_type, '#477332');
        keyboard[0].connect(osc[osc_id]);
        // TODO: use eval instead of switch
        // TODO: if env[send[1][0] is not used, use it.
        switch(send[0]) {
          case "ENV":
            var env_id = env[send[1]].length;
            env[send[1]][env_id] = new EnvCard(deck2, '', '', env[send[1]][0]);
            osc[osc_id].connect(env[send[1]][env_id]);
            // Next is same as env[send[1]][0]
            env[send[1]][env_id].connect(env[send[1]][0].nextCard[0]);
            break;
        }
        break;
      case "envelope":
        var env_id = env.length;
        env[env_id] = [];
        env[env_id][0] = new EnvCard(deck2, 'ENV' + env_id, '#123457', null);
        // add "connect to" entry
        $('#connectTo').append($('<option>').html('ENV' + env_id).val("ENV_" + env_id));
        switch(send[0]) {
          case "DEST":
            env[env_id][0].connect(dest);
            break;
          case "FILTER":
            env[env_id][0].connect(filter[send[1]]);
            break;
        }
        break;
      case "lowpass":
      case "highpass":
      case "bandpass":
        var filter_id = filter.length; 
        filter[filter_id] = new FilterCard(deck3, 'FILTER' + filter_id, LOWPASS, '#87da1a');
        // add "connect to" entry
        $('#connectTo').append($('<option>').html('FILTER' + filter_id).val("FILTER_" + filter_id));
        switch(send[0]) {
          case "DEST":
            filter[filter_id].connect(dest); 
            break;
        }
        break;
    }
    $("#cardSelector").each(function() {
      $(this).children('option').removeAttr('selected');
      this.selectedIndex = 0;
    });
  });
};
