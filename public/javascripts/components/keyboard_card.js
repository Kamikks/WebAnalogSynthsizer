function KeyboardCard(parent, name, color) {
  this.nextCard = [];
  this.card = null;
  this.ctrls = new Object();

  this.card = document.createElement('div');
  this.card.classList.add("card");
  this.card.draggable = true;
  parent.appendChild(this.card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  this.card.appendChild(cardHeader);

  this.closeBtn = document.createElement('button');
  this.closeBtn.type = "button"
  this.closeBtn.classList.add("btn");
  this.closeBtn.classList.add("btn-default");
  this.closeBtn.classList.add("close-btn");
  cardHeader.appendChild(this.closeBtn);

  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  this.card.appendChild(cardBody);

  this.keyboard = document.createElement('webaudio-keyboard');
  this.keyboard.keys = 15;
  cardBody.appendChild(this.keyboard);

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
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

  this.keyboard.addEventListener('change', function(e) {
    if(e.note[0]){
      var freq = KEYC * Math.pow(1.0595, e.note[1]);
      //console.log(e.note[1]);
      for(var i = 0; i < _this.nextCard.length; i++) {
        _this.nextCard[i].play(freq);
      }
    } else {
      for(var i = 0; i < _this.nextCard.length; i++) {
        _this.nextCard[i].stop();
      }
    }
  });

  this.closeBtn.addEventListener('click', function() {
    _this.close();
  });

  this.close = function() {
    this.card.parentNode.removeChild(this.card);
  }

}
