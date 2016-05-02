onload = function() {
    deck1 = document.getElementById('deck1');
    deck2 = document.getElementById('deck2');
    deck3 = document.getElementById('deck3');
    osc = [];
    keyboard = [];
    env = [];
    filter = []; 
    dest = null;

    saw = new OscCardModel({name: 'SAW', color: '#333333', type: SAW});

    adsr = new AdsrCardModel({name: 'ENV', color: '#123457'});
    dest = new DestCardModel({name: 'MASTER', color: '#878888'});
    key = new KeyCardModel({name: 'KEYBOARD', color: '#111111'});

    key.connect(saw);
    saw.connect(adsr);
    adsr.connect(dest);

}

