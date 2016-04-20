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
const LARGE = 1;
const MIDDLE = 2;
const SAW = 'sawtooth';
const SINE = 'sine';
const SQUARE = 'square';

var c = "261.6";
var knob1 = null;

onload = function() {
    var deck1 = document.getElementById('deck1');
    var osc1 = new OscCard(deck1, 'SAW1', '#477332');
    var osc2 = new OscCard(deck1, 'SAW2', '#dab8a3');
    var osc3 = new OscCard(deck1, 'SAW3', '#0ab8a3');
    var keyboard = new KeyboardCard(deck1, 'KEYBOARD', '#1250da');    

//    adsr = new Adsr();
//    adsr.draw();

    var deck2 = document.getElementById('deck2');
    var env1 = new EnvCard(deck2, 'ENV1', '#123457');
    var env2 = new EnvCard(deck2, 'ENV2', '#a23457');
    var env3 = new EnvCard(deck2, 'ENV3', '#3bd457');

    var dest = new DestCard('MASTER');
    keyboard.connect(osc1);
    osc1.connect(dest);
    //osc1.connect(env1);
    //osc1.connect(env2);
    //osc1.connect(env3);
    //osc2.connect(env2);
    //osc3.connect(env3);
    //osc3.connect(env3);
    //env1.connect(dest);

//    adsr2 = new Chart2();
//    adsr2.draw();
}

/*-----------------------------------------------------------------------------*/
/*##                          Components Libraries                           ##*/
/*-----------------------------------------------------------------------------*/

function DestCard(name) {
  this.name = name;
  this.connect = function() {
    //nop
  }

  this.play = function(prev) {
    prev.connect(context.destination);
  }
}

function OscCard(parent, name, color) {
  this.nextCard = [];
  this.tune = null;
  this.env = [];
  this.name = name; 
  this.osc = null;

  var card = document.createElement('div');
  card.classList.add("card"); 
  parent.appendChild(card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  card.appendChild(cardHeader);
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body"); 
  card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  cardBody.appendChild(innerRow);

  var colTune = document.createElement('div');
  colTune.classList.add("col-md-3");
  colTune.classList.add("col-extend");
  innerRow.appendChild(colTune);
  this.tune = new Knob(colTune, 'TUNE', LARGE, color);
  this.tune.draw(270);


  this.connect = function(nextCard) {
    var colEnv = [];
    var i = this.nextCard.length;
    colEnv[i] = document.createElement('div');
    colEnv[i].classList.add("col-md-3");
    colEnv[i].classList.add("col-extend");
    innerRow.appendChild(colEnv[i]);
    this.env[i] = new Knob(colEnv[i], nextCard.name, MIDDLE, color)
    this.env[i].draw(300);
    this.nextCard[i] = nextCard; 
  }

  this.play = function(freq) {
    this.osc = context.createOscillator();
    this.osc.frequency.value = freq;
    this.osc.type = SAW;
    vol = context.createGain();
    this.osc.connect(vol);
    vol.gain.value = (this.env[0].currentValue - 120) / 2;
    console.log(vol.gain.value);
    //this.nextCard[0].play(this.osc);
    this.osc.connect(context.destination);
    this.osc.start(0);
    console.log(this.osc);
  }

  this.stop = function() {
    this.osc.stop(0);
  }
}

function KeyboardCard(parent, name, color) {
  this.nextCard = [];

  var card = document.createElement('div');
  card.classList.add("card"); 
  parent.appendChild(card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  card.appendChild(cardHeader);
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body"); 
  card.appendChild(cardBody);
  
  this.keyboard = document.createElement('webaudio-keyboard');
  this.keyboard.keys = 15;
  cardBody.appendChild(this.keyboard); 

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  var _this = this;

  this.keyboard.addEventListener('change', function(e) {
    if(e.note[0]){
      var freq = c * Math.pow(1.0595, e.note[1]); 
      //console.log(freq);
      for(var i = 0; i < _this.nextCard.length; i++) {
       // console.log(_this.nextCard[i]);
        _this.nextCard[i].play(freq);
      }
    } else {
      for(var i = 0; i < _this.nextCard.length; i++) {
        _this.nextCard[i].stop();
      }
    }
  });
}

function EnvCard(parent, name, color) {
  this.name = name;
  this.nextCard = [];

  var card = document.createElement('div');
  card.classList.add("card"); 
  parent.appendChild(card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  card.appendChild(cardHeader);
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body"); 
  card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  cardBody.appendChild(innerRow);

  var colEnv = []
  this.env = []
  var label = ['Attack', 'Time', 'Decay', 'Time', 'Sustain', 'Release']
  for(i = 1; i < 7; i = i + 1) {
    colEnv[i] = document.createElement('div');
    colEnv[i].classList.add("col-md-2");
    colEnv[i].classList.add("col-extend");
    innerRow.appendChild(colEnv[i]);
    this.env[i] = new Knob(colEnv[i], label[i-1], MIDDLE, color)
    this.env[i].draw(200);
  }

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  this.play = function(prev) {
    var gain = context.createGain();
    prev.connect(gain);
    this.nextCard[0].play(gain);
  }
}

function Chart2() {
  this.canvas = document.getElementById("chart2");

  var proto = Chart2.prototype;
  proto.draw = function() {
    var ctx = this.canvas.getContext('2d'); 
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    var aLv = 0, aTm = 50, dLv = 100, dTm = 20, sLv = 40, rTm = 40; 
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(30, 100);
    ctx.lineTo(300, 100); 
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, 100 - aLv);
    ctx.lineTo(40 + aTm, 100 - dLv);
    ctx.lineTo(40 + aTm + dTm, 100 - sLv);
    ctx.lineTo(300 - rTm, 100 - sLv);
    ctx.lineTo(300, 100);
    ctx.stroke();
  }

  var _this = this;
  this.canvas.addEventListener("mousedown", function(e) {
    //console.log("x: "+e.clientX+", y: "+e.clientY); 
  });
}

function Adsr() {
  this.canvas = document.getElementById("chart1") 
  this.turning = false;
  var ctx = this.canvas.getContext('2d'); 
  var proto = Adsr.prototype

  proto.draw = function() {
    var data = {
      labels: ['Atack', '', 'Decay', '', 'Sustain', '', 'Release', '', ''],
      datasets: [
        {
          backgroundColor: "rgba(50, 205, 50, 0.5)",
          borderColor: "rgba(34, 139, 34, 1)",
          fillcolor: "rgba(220, 220, 220, 0.5)",
          strokeColor: "rgba(34, 139, 34, 0.5)",
          pointColor: "rgba(0, 100, 0, 1)",
          pointStrokeColor: "#fff",
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          tension: 0.1,
          data: [0, 50, 100, 100, 100, 100, 100, 10, 0]
        }
      ]
    };
    var options = {
      legend: {
        display: false
      }
    };
    this.chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });
  }

  var _this = this;
  var _currentValue = 0;
  var _index = null;

  this.canvas.addEventListener("mousedown", function(e) {
    if(_this.chart.getElementAtEvent(e)[0]) {
     // console.log(_this.chart.getElementAtEvent(e)[0]);
      _index = _this.chart.getElementAtEvent(e)[0]._index;
      _this.turning = true;
      _currentValue = _this.currentValue;
      originY = e.clientY;
    }
  });

  window.addEventListener("mousemove", function(e) {
    if(_this.turning) {
      _y = _this.chart.data.datasets[0].data[_index] + ((originY - e.clientY) / 10 );
      if(_index == 3) {
        next_y = _this.chart.data.datasets[0].data[_index + 1];
        if(_y < next_y) {
          _y = next_y;
        } else if(_y > 100) {
          _y = 100;
        }
      } else if(_index == 5) {
        release_y = _this.chart.data.datasets[0].data[_index + 2];
        if(_y < release_y) {
          _y = release_y;
        } else if(_y > 100) {
          _y = 100;
        }
        _this.chart.data.datasets[0].data[_index - 1] = _y;
        _this.chart.data.datasets[0].data[_index + 1] = _y;
      } else if(_index == 7) {
        prev_y = _this.chart.data.datasets[0].data[_index - 1];
        if(_y < 0) {
          _y = 0;
        } else if(_y > prev_y) {
          _y = prev_y;
        }
      } else if(_index == 2 || _index == 4 || _index == 6 || _index == 8) {
        _y = _this.chart.data.datasets[0].data[_index]; 
      } else {
        if(_y < 0) {
          _y = 0;
        } else if(_y > 100) {
          _y = 100; 
        }
      }
      _this.chart.data.datasets[0].data[_index] = _y;
      _this.chart.update();
      e.preventDefault();
    }
  });

  window.addEventListener("mouseup", function(e) {
    if(_this.turning) {
      _this.turning = false;
    }
  });
}

function Knob(parent, label, size, color) {
  this.turning = false;
  this.canvas = document.createElement('canvas');
  parent.appendChild(this.canvas);
  this.currentValue = 0;
  this.canvas.title = label;
  if (size==LARGE) {
    this.canvas.width = 128, this.canvas.height = 70;
    this.x = 64, this.y = 40, this.rad = 30;
  } else if (size==MIDDLE) {
    this.canvas.width = 48, this.canvas.height = 70;
    this.x = 24, this.y = 35, this.rad = 15;
  }
  this.color = color;
  //create label
  this.label = document.createElement('div');
  this.label.textContent = label;
  this.label.style.fontSize = 'smaller';
  this.label.style.textAlign = 'center';
  parent.insertBefore(this.label, this.canvas);
 
  var proto = Knob.prototype;
  proto.draw = function(value) {
    if( ! this.canvas || ! this.canvas.getContext ){ return false ;}
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 11;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 60 * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();

    if( value >= 120 ) {
      if (value >= 420) { value = 420; }
      ctx.lineWidth = 10;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.rad, value * Math.PI / 180, 120 * Math.PI / 180, true);
      ctx.stroke();
      this.currentValue = value;
    }
  }

  var _this = this
  var _currentValue = 0;

  this.canvas.addEventListener("mousedown", function(e) {
    _this.turning = true;
    originY = e.clientY;
    _currentValue = _this.currentValue;
  });

  window.addEventListener("mousemove", function(e) {
    if(_this.turning) {
     // console.log(e.clientY);
      _this.draw((originY - e.clientY)*2 + _currentValue);
      e.preventDefault();
    }
  });

  window.addEventListener("mouseup", function(e) {
    if(_this.turning) {
      _this.turning = false;
    }
  });

}
var osc;
function start(freq) {
  osc = context.createOscillator();
  osc.frequency.value = freq;
  osc.type = SAW;
  osc.connect(context.destination);
  osc.start(0);
}

function stop() {
  osc.stop(0);
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


//keyboard
//var keyboard = document.getElementById('keyboard');
//keyboard.addEventListener('change', function(e) {
//    if(e.note[0]){
//        var freq = c * Math.pow(1.0595, e.note[1]); 
    //    console.log("type=" + type);
    //    console.log("type2=" + type2);
//        startOsc(freq);
//    } else {
//        stopOsc();
//    }

//});

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



//OSC1 Volume
//var osc1GainKnob = document.getElementById("osc1GainKnob")
//osc1GainKnob.addEventListener('change', function(e) {
//    osc1Vol = e.target.value / 100;
    //console.log("osc1Vol=" + osc1Vol);
//});

//OSC2 Volume
//var osc2GainKnob = document.getElementById("osc2GainKnob")
//osc2GainKnob.addEventListener('change', function(e) {
//    osc2Vol = e.target.value /100;
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
