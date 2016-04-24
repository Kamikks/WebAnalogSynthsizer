function EnvCard(parent, name, color, envCard) {
  this.env = [];
  this.card = null;
  this.name = name;

  if(envCard !== null) {
    this.card = envCard.card;
    this.env = envCard.env;
  } else {
    this.card = document.createElement('div');
    this.card.classList.add("card");
    parent.appendChild(this.card);
    var cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header");
    cardHeader.style.borderLeft = "10px solid " + color;
    cardHeader.textContent = name;
    this.card.appendChild(cardHeader);
    var cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    this.card.appendChild(cardBody);
    var innerRow = document.createElement('div');
    innerRow.classList.add("row");
    cardBody.appendChild(innerRow);

    var colEnv = new Object(); 
    var label = ['AttackTime', 'Decay', 'Time', 'Sustain', 'Release'];
    var key = ['AttackTime', 'DecayLevel', 'DecayTime', 'SustainLevel', 'ReleaseTime'];

    for(i = 1; i < 6; i = i + 1) {
      colEnv[key[i-1]] = document.createElement('div');
      colEnv[key[i-1]].classList.add("col-md-2");
      colEnv[key[i-1]].classList.add("col-extend");
      innerRow.appendChild(colEnv[key[i-1]]);
      this.env[key[i-1]] = new Knob(colEnv[key[i-1]], label[i-1], MIDDLE, color)
      this.env[key[i-1]].draw(200);
      //console.log(key[i-1]);
    }
  }

  this.nextCard = [];
  this.envelope = null;
  this.startTime = 0;

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  this.play = function(prev) {
    this.envelope = context.createGain();
    prev.connect(this.envelope);
    for(var i = 0; i < this.nextCard.length; i++) {
      this.nextCard[i].play(this.envelope);
    }
    this.startTime = context.currentTime;
  }

  this.postSend = function() {
    // attackLevel: 0 - 1[s]
    // TODO: create get currentValue method
    this.envelope.gain.setValueAtTime(0, this.startTime);
    // attackTime: 0 - 3[s]
    var attackTime = this.startTime + parseFloat((this.env['AttackTime'].currentValue - 120) / 100);
    // decayTime: 0 - 3[s]
    var decayTime = parseFloat((this.env['DecayTime'].currentValue - 120) / 100);
    var decayLevel = (this.env['DecayLevel'].currentValue - 120) / 300;
    // sustainLevel
    var sustainLevel = (this.env['SustainLevel'].currentValue - 120) / 300;
    //attack
    this.envelope.gain.linearRampToValueAtTime(decayLevel, attackTime);
    //decay
    this.envelope.gain.setTargetAtTime(sustainLevel, attackTime, decayTime);
  }

  this.stop = function() {
    var currentTime = context.currentTime;
    this.envelope.gain.cancelScheduledValues(currentTime);
    this.envelope.gain.setValueAtTime(this.envelope.gain.value, currentTime);
    // releaseTime: 0 - 3[s]
    var releaseTime = (this.env['ReleaseTime'].currentValue - 120) / 300;
    this.envelope.gain.linearRampToValueAtTime(0, currentTime + releaseTime);
  }
}

