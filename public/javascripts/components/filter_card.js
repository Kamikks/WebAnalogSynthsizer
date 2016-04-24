function FilterCard(parent, name, type, color) {
  this.card = null;
  this.name = name;

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

  var colFreq = document.createElement('div');
  colFreq.classList.add("col-md-6");
  colFreq.classList.add("col-extend");
  innerRow.appendChild(colFreq);
  this.freq = new Knob(colFreq, 'Frequency', LARGE, color)
  this.freq.draw(200);
  //console.log(key[i-1]);
  var colQ = document.createElement('div');
  colQ.classList.add("col-md-6");
  colQ.classList.add("col-extend");
  innerRow.appendChild(colQ);
  this.q = new Knob(colQ, 'Q', LARGE, color)
  this.q.draw(120);

  this.nextCard = [];
  this.filter = null;

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  this.play = function(prev) {
    this.filter = context.createBiquadFilter();
    this.filter.type = type
    // frequency: 0 - 10000
    this.filter.frequency.value = (this.freq.currentValue - 120) * 100 / 3 
    // q: 0 - 1000
    this.filter.Q.value = (this.q.currentValue - 120) / 300
    prev.connect(this.filter);
    for(var i = 0; i < this.nextCard.length; i++) {
      this.nextCard[i].play(this.filter);
    }
  }

  this.postSend = function() {
    // NOP
  }

  this.stop = function() {
    // NOP
  }
}

