onload = function() {
    deck1 = document.getElementById('deck1');
    deck2 = document.getElementById('deck2');
    deck3 = document.getElementById('deck3');
    osc = [];
    keyboard = [];
    env = [];
    filter = []; 
    dest = null;

    osc[0] = new OscCard(deck1, 'SAW0', SAW, '#477332');
//    var osc2 = new OscCard(deck1, 'SINE2', SINE, '#dab8a3');
//    var osc3 = new OscCard(deck1, 'SAW3', SAW, '#0ab8a3');
    keyboard[0] = new KeyboardCard(deck1, 'KEYBOARD', '#1250da');    

    env[0] = [];
    env[0][0] = new EnvCard(deck2, 'ENV0', '#123457', null);
//    var env1_2 = new EnvCard(deck2, 'ENV1', '#123457', env1);
//    var env2 = new EnvCard(deck2, 'ENV2', '#a23457', null);

    filter[0] = new FilterCard(deck3, 'FILTER0', LOWPASS, '#87da1a');
    dest = new DestCard(deck3);

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

    loadDialog();
}

