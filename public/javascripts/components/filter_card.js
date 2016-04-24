function FilterCard(parent, name, type, color) {
  this.card = null;
  this.name = name;
  this.ctrls = new Object();
  this.nextCard = [];

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

  var colFreq = document.createElement('div');
  colFreq.classList.add("col-md-6");
  colFreq.classList.add("col-extend");
  innerRow.appendChild(colFreq);
  this.ctrls['FREQUENCY'] = new Knob(colFreq, 'Frequency', name + '_Frequency', LARGE, color)
  this.ctrls['FREQUENCY'].draw(200);
  //console.log(key[i-1]);
  var colQ = document.createElement('div');
  colQ.classList.add("col-md-6");
  colQ.classList.add("col-extend");
  innerRow.appendChild(colQ);
  this.ctrls['Q'] = new Knob(colQ, 'Q', name + '_Q', LARGE, color)
  this.ctrls['Q'].draw(120);

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

  this.filter = null;

  // Define method
  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  this.play = function(prev) {
    this.filter = context.createBiquadFilter();
    this.filter.type = type
    // frequency: 0 - 10000
    this.filter.frequency.value = (this.ctrls['FREQUENCY'].currentValue - 120) * 100 / 3 
    // q: 0 - 1000
    this.filter.Q.value = (this.ctrls['Q'].currentValue - 120) / 300
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

