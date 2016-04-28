function OscCard(parent, name, type, color) {
  // Create DOM
  this.nextCard = [];
  this.prev = null;
  this.name = name;
  this.osc = null;
  this.ctrls = new Object();
  this.closeBtn = null;

  this.card = document.createElement('div');
  this.card.classList.add("card");
  this.card.draggable = true;
  parent.appendChild(this.card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  this.closeBtn = document.createElement('button');
  this.closeBtn.type = "button"
  this.closeBtn.classList.add("btn");
  this.closeBtn.classList.add("btn-default");
  this.closeBtn.classList.add("close-btn");
  cardHeader.appendChild(this.closeBtn);
  this.card.appendChild(cardHeader);
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  this.card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  innerRow.classList.add("row-extend");
  cardBody.appendChild(innerRow);


  var colTune = document.createElement('div');
  colTune.classList.add("col-md-4");
  colTune.classList.add("col-extend");
  innerRow.appendChild(colTune);
  this.ctrls['TUNE'] = new Knob(colTune, 'TUNE', name + '_TUNE', LARGE, color);
  this.ctrls['TUNE'].draw(270);

  var colOct = document.createElement('div');
  colOct.classList.add("col-md-4");
  colOct.classList.add("col-extend"); 
  innerRow.appendChild(colOct);
  this.ctrls['OCT'] = new Knob(colOct, 'OCT', name + '_OCT', MIDDLE, color);
  this.ctrls['OCT'].draw(270);


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
    _this.disconnect();
    _this.card.parentNode.removeChild(_this.card);
  });

  // Define Method 
  // TODO: disconnect prev and next cards.
  this.connect = function(nextCard) {
    var colSender = null;
    colSender = document.createElement('div');
    colSender.classList.add("col-md-4");
    colSender.classList.add("col-extend");
    innerRow.appendChild(colSender);
    this.ctrls['SEND'] = new Knob(colSender, nextCard.name, name + '_' + nextCard.name, MIDDLE, color)
    this.ctrls['SEND'].draw(300);
    nextCard.prev = this;
    this.nextCard[0] = nextCard;
  }

  this.disconnect = function() {
    this.prev.nextCard.splice(this.prev.nextCard.indexOf(this.card), 1);
  }

  this.play = function(freq) {
    this.osc = context.createOscillator();
    this.osc.frequency.value = freq *
      Math.pow(1.0595, (this.ctrls['TUNE'].currentValue - 270) / 10) *
      Math.pow(1.0595, 12 * Math.floor((this.ctrls['OCT'].currentValue - 270) / 50));
    this.osc.type = type;
    var sendLevel = null 
    sendLevel = context.createGain();
    this.osc.connect(sendLevel);
    sendLevel.gain.value = (this.ctrls['SEND'].currentValue - 120) / 300;
    this.nextCard[0].play(sendLevel);
    this.osc.start(0);
    this.nextCard[0].postSend();
  }

  this.stop = function() {
    this.nextCard[0].stop();
    var currentTime = context.currentTime;
    this.osc.stop(currentTime + 1);
  }
}

