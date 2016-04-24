function EnvCard(parent, name, color, envCard) {
  // Create DOM
  this.env = [];
  this.card = null;
  this.name = name;
  this.ctrls = new Object();
  this.nextCard = [];

  if(envCard !== null) {
    this.name = envCard.name;
    this.card = envCard.card;
    this.ctrls = envCard.ctrls;
    console.log(this.ctrls);
  } else {
    this.card = document.createElement('div');
    this.card.classList.add("card");
    this.card.draggable = true;
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
      this.ctrls[key[i-1]] = new Knob(colEnv[key[i-1]], label[i-1], name + '_' + label[i-1], MIDDLE, color)
      this.ctrls[key[i-1]].draw(200);
      //console.log("this is " + this + ", key is " + name + label[i-1]);
    }

    // Define EventListener
    // TODO: integrate definition of each card
    var _this = this;
    this.card.addEventListener('dragstart', function(e) {
      this.style.opacity = '0.4';
      _tmpDrgSrc = _this;
      e.dataTransfer.effectAllowed = 'move';
    }, false);
    this.card.addEventListener('dragenter', function() {
      this.classList.add('dragenter');
    }, false);
    this.card.addEventListener('dragleave', function() {
      this.classList.remove('dragenter');
    }, false);
    this.card.addEventListener('dragover', function(e) {
      if(e.preventDefault) {
	e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
    }, false);
    this.card.addEventListener('drop', function(e) {
      if(e.stopPropagation) {
	e.stopPropagation();
      }
      if(_tmpDrgSrc.card != this) {
	parent.insertBefore(_tmpDrgSrc.card, this);
      }
      return false;
    }, false);
    this.card.addEventListener('dragend', function(e) {
      this.style.opacity = '1.0';
      this.classList.remove('dragenter');
    }, false);
  }

  // Define Method
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
    // attackLevel: 0[s]
    this.startTime = context.currentTime;
    this.envelope.gain.setValueAtTime(0, this.startTime);
  }

  this.postSend = function() {
    // TODO: create get currentValue method
    // attackTime: 0 - 3[s]
    var attackTime = this.startTime + parseFloat((this.ctrls['AttackTime'].currentValue - 120) / 100);
    // decayTime: 0 - 3[s]
    var decayTime = parseFloat((this.ctrls['DecayTime'].currentValue - 120) / 100);
    var decayLevel = (this.ctrls['DecayLevel'].currentValue - 120) / 300;
    // sustainLevel
    var sustainLevel = (this.ctrls['SustainLevel'].currentValue - 120) / 300;
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
    var releaseTime = (this.ctrls['ReleaseTime'].currentValue - 120) / 300;
    this.envelope.gain.linearRampToValueAtTime(0, currentTime + releaseTime);
  }
}

