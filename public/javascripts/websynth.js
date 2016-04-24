onload = function() {
    var deck1 = document.getElementById('deck1');
    var osc1 = new OscCard(deck1, 'SAW1', SAW, '#477332');
    var osc2 = new OscCard(deck1, 'SINE2', SINE, '#dab8a3');
    var osc3 = new OscCard(deck1, 'SAW3', SAW, '#0ab8a3');
    var keyboard = new KeyboardCard(deck1, 'KEYBOARD', '#1250da');    

//    adsr = new Adsr();
//    adsr.draw();

    var deck2 = document.getElementById('deck2');
    var env1 = new EnvCard(deck2, 'ENV1', '#123457', null);
    var env1_2 = new EnvCard(deck2, 'ENV1', '#123457', env1);
    var env2 = new EnvCard(deck2, 'ENV2', '#a23457', null);

    var dest = new DestCard('MASTER');
    keyboard.connect(osc1);
    keyboard.connect(osc2);
    keyboard.connect(osc3);
    osc1.connect(env1);
    osc2.connect(env1_2);
    osc3.connect(env2);
    env1.connect(dest);
    env2.connect(dest);

//    adsr2 = new Chart2();
//    adsr2.draw();
}


var startOsc = function(freq) {
    //osc1
    osc1 = context.createOscillator();
    osc1.frequency.value = freq;
    osc1.type = type;
    osc1Gain = context.createGain();
    osc1.connect(osc1Gain);
    osc1Gain.gain.value = osc1Vol;
    //osc2
    osc2 = context.createOscillator();
    osc2.frequency.value = freq;
    osc2.type = type2
    osc2Gain = context.createGain();
    osc2.connect(osc2Gain);
    osc2Gain.gain.value = osc2Vol;
    //gain
    gain = context.createGain();
    osc1Gain.connect(gain);
    osc2Gain.connect(gain);
    //filter
    filter = context.createBiquadFilter();
    filter.type = fType;
    filter.frequency.value = filterFreq;
    filter.Q.value = filterQ;
    gain.connect(filter);
    filter.connect(context.destination);
    //ADSR
    var t0 = context.currentTime;
    osc1.start(0);
    osc2.start(0);
    gain.gain.setValueAtTime(0, t0);
    var t1 = t0 + parseFloat(attack);
    var t2 = parseFloat(decay);
    gain.gain.linearRampToValueAtTime(1, t1);
    gain.gain.setTargetAtTime(sustain, t1, t2);
}
    
var stopOsc = function() {
    var curTime = context.currentTime; 
    gain.gain.cancelScheduledValues(curTime);
    gain.gain.setValueAtTime(gain.gain.value, curTime);

    gain.gain.setTargetAtTime(0, curTime, release);
    intervalId = window.setInterval(function() {
        var VALUE_OF_STOP = 1e-3;
        if(gain.gain.value < VALUE_OF_STOP) {
            osc1.stop(0);
            osc2.stop(0);
            if(intervalId !== null) {
                window.clearInterval(intervalId);
                intervalId = null;
            }
        }
    })
}


//OSC1 type
//var osc1TypeObj = document.getElementById('osc1Type');
//osc1TypeObj.addEventListener('change', function() {
//    if (document.getElementById('osc1Tri').checked) {
//      type = "triangle"
//    } else if(document.getElementById('osc1Saw').checked) {
//      type = "sawtooth"
//    } else if(document.getElementById('osc1Sqr').checked) {
//      type = "square"
//    } else {
//      type = "sine"
//    } 
//    console.log("osc1Type=" + type);
//});

//OSC2 type
//var osc2TypeObj = document.getElementById('osc2Type');
//osc2TypeObj.addEventListener('change', function() {
//    if (document.getElementById('osc2Tri').checked) {
//      type2 = "triangle"
//    } else if(document.getElementById('osc2Saw').checked) {
//      type2 = "sawtooth"
//    } else if(document.getElementById('osc2Sqr').checked) {
//      type2 = "square"
//    } else {
//      type2 = "sine"
//    } 
//    console.log("osc2Type=" + type2);
//});

//filter type
//var fTypeObj = document.getElementById('filterType');
//fTypeObj.addEventListener('change', function() {
//    if (document.getElementById('hp').checked) {
//      fType = "highpass"
//    } else if(document.getElementById('bp').checked) {
//      fType = "bandpass"
//    } else {
//      fType = "lowpass"
//    } 
//    console.log("fType=" + fType);
//});

//OSC EG
//var attackKnob = document.getElementById("attackKnob")
//attackKnob.addEventListener('change', function(e) {
//    attack = e.target.value /100;
//    //console.log("attack: " + attack);
//});

//var decayKnob = document.getElementById("decayKnob")
//decayKnob.addEventListener('change', function(e) {
//    decay = e.target.value /100;
    //console.log("decay: " + decay);
//});

//var sustainKnob = document.getElementById("sustainKnob")
//sustainKnob.addEventListener('change', function(e) {
//    sustain= e.target.value /100;
    //console.log("sustain: " + sustain);
//});

//var releaseKnob = document.getElementById("releaseKnob")
//releaseKnob.addEventListener('change', function(e) {
//    release = e.target.value /100;
    //console.log("release: " + release);
//});

//filetr frequency
//var filterFreqKnob = document.getElementById("filterFreqKnob");
//filterFreqKnob.addEventListener('change', function(e) {
//    filterFreq = e.target.value;
    //console.log("filterFreq=" + filterFreq);
//});
