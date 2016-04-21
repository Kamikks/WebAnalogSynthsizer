function OscCard(parent, name, type, color) {
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
    this.osc.frequency.value = freq * Math.pow(1.0595, (this.tune.currentValue - 270) / 10);
    this.osc.type = type;
    var volume = []
    for(var i = 0; i < this.env.length; i++) {
      volume[i] = context.createGain();
      this.osc.connect(volume[i]);
      volume[i].gain.value = (this.env[i].currentValue - 120) / 300;
      this.nextCard[0].play(volume[i]);
    }
    this.osc.start(0);
  }

  this.stop = function() {
    this.osc.stop(0);
  }
}

