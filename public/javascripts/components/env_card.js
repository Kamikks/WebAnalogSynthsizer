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
    var envelope = context.createGain();
    prev.connect(envelope);
    for(var i = 0; i < this.nextCard.length; i++) {
      this.nextCard[i].play(envelope);
    }
  }
}

