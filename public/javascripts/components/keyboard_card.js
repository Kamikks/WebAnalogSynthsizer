function KeyboardCard(parent, name, color) {
  this.nextCard = [];
  this.prev = null;
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


  // Define EventListener
  // TODO: integrate definition of each card
  var _this = this;
  var insertTo = document.createElement('div')
  this.card.addEventListener('dragstart', function(e) {
    this.style.opacity = '0.4';
    _tmpDrgSrc = this;
    e.dataTransfer.effectAllowed = 'move';
  }, false);
  this.card.addEventListener('dragenter', function(e) {
    if(this != _tmpDrgSrc) {
      this.parentNode.insertBefore(insertTo, this);
      insertTo.classList.add('dragenter');
    }
  }, false);
  insertTo.addEventListener('dragleave', function() {
    this.classList.remove('dragenter');
    this.parentNode.removeChild(this);
  }, false);
  insertTo.addEventListener('dragover', function(e) {
    if(e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
  }, false);
  insertTo.addEventListener('drop', function(e) {
    if(e.stopPropagation) {
      e.stopPropagation();
    }
    if(_tmpDrgSrc != _this.card) {
      _this.card.parentNode.insertBefore(_tmpDrgSrc, _this.card);
      _tmpDrgSrc.style.opacity = '1.0';
      this.classList.remove('dragenter');
      this.parentNode.removeChild(this);
    }
    return false;
  }, false);

  this.closeBtn.addEventListener('click', function() {
    _this.card.parentNode.removeChild(_this.card);
    _this.disconnect();
  });

  // Define Method 
  // TODO: disconnect prev and next cards.
  
  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    nextCard.prev = this;
    this.nextCard[i] = nextCard;
  }

  this.disconnect = function() {
    //NOP
  }

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
