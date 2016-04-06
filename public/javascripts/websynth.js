var context = new window.AudioContext();

//chord c
var osc1 = null;
var osc2 = null;
var osc1Gain = null;
var osc2Gain = null;
var gain = null;
var filter = null;
var clickState = false;
var type = "sawtooth";
var type2 = "sine";
var osc1Vol = 1;
var osc2Vol = 0.1;
var attack = 0.1;
var decay = 0.1;
var sustain = 1;
var release = 0.1;
var intervalid = null;
var fType = "lowpass";
var filterFreq = 10000;
var filterQ = 5;

var c = "261.6";

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


//keyboard
var keyboard = document.getElementById('keyboard');
keyboard.addEventListener('change', function(e) {
    if(e.note[0]){
        var freq = c * Math.pow(1.0595, e.note[1]); 
    //    console.log("type=" + type);
    //    console.log("type2=" + type2);
        startOsc(freq);
    } else {
        stopOsc();
    }

});

//OSC1 type
var osc1TypeObj = document.getElementById('osc1Type');
osc1TypeObj.addEventListener('change', function() {
    if (document.getElementById('osc1Tri').checked) {
      type = "triangle"
    } else if(document.getElementById('osc1Saw').checked) {
      type = "sawtooth"
    } else if(document.getElementById('osc1Sqr').checked) {
      type = "square"
    } else {
      type = "sine"
    } 
    console.log("osc1Type=" + type);
});

//OSC2 type
var osc2TypeObj = document.getElementById('osc2Type');
osc2TypeObj.addEventListener('change', function() {
    if (document.getElementById('osc2Tri').checked) {
      type2 = "triangle"
    } else if(document.getElementById('osc2Saw').checked) {
      type2 = "sawtooth"
    } else if(document.getElementById('osc2Sqr').checked) {
      type2 = "square"
    } else {
      type2 = "sine"
    } 
    console.log("osc2Type=" + type2);
});

//filter type
var fTypeObj = document.getElementById('filterType');
fTypeObj.addEventListener('change', function() {
    if (document.getElementById('hp').checked) {
      fType = "highpass"
    } else if(document.getElementById('bp').checked) {
      fType = "bandpass"
    } else {
      fType = "lowpass"
    } 
    console.log("fType=" + fType);
});



//OSC1 Volume
var osc1GainKnob = document.getElementById("osc1GainKnob")
osc1GainKnob.addEventListener('change', function(e) {
    osc1Vol = e.target.value / 100;
    //console.log("osc1Vol=" + osc1Vol);
});

//OSC2 Volume
var osc2GainKnob = document.getElementById("osc2GainKnob")
osc2GainKnob.addEventListener('change', function(e) {
    osc2Vol = e.target.value /100;
});

//OSC EG
var attackKnob = document.getElementById("attackKnob")
attackKnob.addEventListener('change', function(e) {
    attack = e.target.value /100;
    //console.log("attack: " + attack);
});

var decayKnob = document.getElementById("decayKnob")
decayKnob.addEventListener('change', function(e) {
    decay = e.target.value /100;
    //console.log("decay: " + decay);
});

var sustainKnob = document.getElementById("sustainKnob")
sustainKnob.addEventListener('change', function(e) {
    sustain= e.target.value /100;
    //console.log("sustain: " + sustain);
});

var releaseKnob = document.getElementById("releaseKnob")
releaseKnob.addEventListener('change', function(e) {
    release = e.target.value /100;
    //console.log("release: " + release);
});

//filetr frequency
var filterFreqKnob = document.getElementById("filterFreqKnob")
filterFreqKnob.addEventListener('change', function(e) {
    filterFreq = e.target.value;
    //console.log("filterFreq=" + filterFreq);
});
