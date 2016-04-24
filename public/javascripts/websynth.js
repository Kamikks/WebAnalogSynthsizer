onload = function() {
    var deck1 = document.getElementById('deck1');
    var deck2 = document.getElementById('deck2');
    var deck3 = document.getElementById('deck3');
    var osc = [];
    osc[0] = new OscCard(deck1, 'SAW0', SAW, '#477332');
//    var osc2 = new OscCard(deck1, 'SINE2', SINE, '#dab8a3');
//    var osc3 = new OscCard(deck1, 'SAW3', SAW, '#0ab8a3');
    var keyboard = [];
    keyboard[0] = new KeyboardCard(deck1, 'KEYBOARD', '#1250da');    

    var env = [];
    env[0] = [];
    env[0][0] = new EnvCard(deck2, 'ENV0', '#123457', null);
//    var env1_2 = new EnvCard(deck2, 'ENV1', '#123457', env1);
//    var env2 = new EnvCard(deck2, 'ENV2', '#a23457', null);

    var filter = []; 
    filter[0] = new FilterCard(deck3, 'LOWPASS0', LOWPASS, '#87da1a');
    var dest = new DestCard('MASTER');

    keyboard[0].connect(osc[0]);
    //keyboard.connect(osc2);
    //keyboard.connect(osc3);

    osc[0].connect(env[0][0]);
    //osc2.connect(env1_2);
    //osc3.connect(env2);

    env[0][0].connect(filter[0]);
    //env1_2.connect(filter);
    //env2.connect(filter);
    
    filter[0].connect(dest);


    $("#myModal").on('click', '.modal-footer .btn-primary', function() {
      $("#myModal").modal("hide");
      var selected = $("#cardSelector input[type=radio]").attr('name');
      // send[0]: type, send[1]: id
      var send = $("#connectTo").val().split("_");
      send[1] = parseInt(send[1], 10);
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
      }
      $("#cardSelector").each(function() {
        $(this).children('option').removeAttr('selected');
        this.selectedIndex = 0;
      });
    });
}

