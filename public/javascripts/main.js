onload = function() {
    deck1 = document.getElementById('deck1');
    deck2 = document.getElementById('deck2');
    deck3 = document.getElementById('deck3');
    osc = [];
    keyboard = [];
    env = [];
    filter = []; 
    dest = null;

//    osc[0] = new OscCard({deck: deck1, name: 'SAW0', type: SAW, color: '#477332'});
//    keyboard[0] = new KeyboardCard({deck: deck1, name: 'KEYBOARD', color: '#1250da'});    

    card1 = CardModel.add({parentId: 'deck1', name: 'TEST', id: 'testCard', color: '#333333'});
//    card1 = CardModel.add({parentId: 'deck1', name: 'TEST', id: 'testCard', color: '#333333', ctrls: {}});
    params = {name: 'TUNE', id: 'CARD1_TUNE', size: MIDDLE, value: 270, color: '#233433'};
    card1.addKnob(params);
    params = {name: 'OCT', id: 'CARD1_OCT', size: MIDDLE, value: 270, color: '#233433'};
    card1.addKnob(params);
    params = {name: 'SEND', id: 'CARD1_SEND', size: MIDDLE, value: 270, color: '#233433'};
    card1.addKnob(params);
    params = {name: 'ATACK', id: 'CARD1_ATACK', size: MIDDLE, value: 270, color: '#233433'};
    card1.addKnob(params);
    params = {name: 'TIME', id: 'CARD1_TIME', size: MIDDLE, value: 270, color: '#233433'};
    card1.addKnob(params);
//    this.ctrls[key] = KnobModel.add({parentId: col.id, name: key, id: this.name + '_' + key, size: size, value: defVal, color: this.color});
    card2 = CardModel.add({parentId: 'deck1', name: 'TEST2', id: 'testCard2', color: '#333333'});

    env[0] = [];
    env[0][0] = new EnvCard({deck: deck2, name: 'ENV0', color: '#123457'});

    filter[0] = new FilterCard({deck: deck3, name: 'FILTER0', type: LOWPASS, color: '#87da1a'});
    dest = new DestCard({deck: deck3, name: 'MASTER', color: '#333333'});

    keyboard[0].connect(osc[0]);

    osc[0].connect(env[0][0]);

    env[0][0].connect(filter[0]);
    
    filter[0].connect(dest);

    loadDialog();
}

