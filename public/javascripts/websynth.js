onload = function() {
    var deck1 = document.getElementById('deck1');
    var osc1 = new OscCard(deck1, 'SAW1', SAW, '#477332');
    var osc2 = new OscCard(deck1, 'SINE2', SINE, '#dab8a3');
    var osc3 = new OscCard(deck1, 'SAW3', SAW, '#0ab8a3');
    var keyboard = new KeyboardCard(deck1, 'KEYBOARD', '#1250da');    
    var deck2 = document.getElementById('deck2');
    var env1 = new EnvCard(deck2, 'ENV1', '#123457', null);
    var env1_2 = new EnvCard(deck2, 'ENV1', '#123457', env1);
    var env2 = new EnvCard(deck2, 'ENV2', '#a23457', null);
    var filter = new FilterCard(deck3, 'LOWPASS', LOWPASS, '#87da1a');
    var dest = new DestCard('MASTER');

    keyboard.connect(osc1);
    keyboard.connect(osc2);
    keyboard.connect(osc3);

    osc1.connect(env1);
    osc2.connect(env1_2);
    osc3.connect(env2);

    env1.connect(filter);
    env1_2.connect(filter);
    env2.connect(filter);
    
    filter.connect(dest);
}

