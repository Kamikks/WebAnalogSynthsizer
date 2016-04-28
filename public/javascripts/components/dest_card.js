function DestCard(parent) {
  this.card = null;
  this.name = 'MASTER';
  this.ctrls = new Object();
  this.nextCard = [];
  this.prev = null;
  var color = "#000";

  this.card = document.createElement('div');
  this.card.classList.add("card");
  this.card.draggable = true;
  parent.appendChild(this.card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = this.name;
  this.card.appendChild(cardHeader);

  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  this.card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  innerRow.classList.add("row-extend");
  cardBody.appendChild(innerRow);

  var colMaster = document.createElement('div');
  colMaster.classList.add("col-md-12");
  colMaster.classList.add("col-extend");
  innerRow.appendChild(colMaster);
  this.ctrls['MASTER'] = new Knob(colMaster, 'MASTER', 'MASTER', LARGE, color)
  this.ctrls['MASTER'].draw(400);

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

  this.connect = function() {
    //nop
  }
  this.disconnect = function() {
    //nop
  }
  this.play = function(prev) {
    var masterLevel = context.createGain();
    masterLevel.gain.value = (this.ctrls['MASTER'].currentValue - 120) / 300;
    prev.connect(masterLevel);
    masterLevel.connect(context.destination);
  }
}

