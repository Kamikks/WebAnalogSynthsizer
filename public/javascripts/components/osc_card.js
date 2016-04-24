function OscCard(parent, name, type, color) {
  // Create DOM
  this.nextCard = [];
  this.name = name;
  this.osc = null;
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
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  this.card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
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
  this.card.addEventListener('dragstart', function(e) {
    this.style.opacity = '0.4';
    _tmpDrgSrc = _this;
    e.dataTransfer.effectAllowed = 'move';
//    e.dataTransfer.setData('text/html', this.innerHTML);
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
//      _tmpDrgSrc.card.innerHTML = this.innerHTML;
//      this.innerHTML = e.dataTransfer.getData('text/html');
//      console.log(_this);
//      for(key in _tmpDrgSrc.ctrls) {
//        _tmpDrgSrc.ctrls[key].draw(_tmpDrgSrc.ctrls[key].currentValue);
//        _tmpDrgSrc.ctrls[key].init();
//      }
//      for(key in _this.ctrls) {
//        _this.ctrls[key].draw(_this.ctrls[key].currentValue);
//        _this.ctrls[key].init();
//      }

    }
    return false;
  }, false);
  this.card.addEventListener('dragend', function(e) {
    this.style.opacity = '1.0';
    this.classList.remove('dragenter');
  }, false);

  // Define Method 
  this.connect = function(nextCard) {
    console.log(nextCard);
    var colSender = null;
    colSender = document.createElement('div');
    colSender.classList.add("col-md-4");
    colSender.classList.add("col-extend");
    innerRow.appendChild(colSender);
    this.ctrls['SEND'] = new Knob(colSender, nextCard.name, name + '_' + nextCard.name, MIDDLE, color)
    this.ctrls['SEND'].draw(300);
    this.nextCard[0] = nextCard;
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

