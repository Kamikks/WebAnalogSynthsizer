function Card(parent, name, color) {
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
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  this.card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  cardBody.appendChild(innerRow);

  var _this = this;
  this.card.addEventListener('dragstart', function(e) {
    this.style.opacity = '0.4';
    _tmpDrgSrc = _this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
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
  this.addEventListener('drop', function(e) {
    if(e.stopPropagation) {
      e.stopPropagation();
    }   
    if(_tmpDrgSrc.card != this) {
      _tmpDrgSrc.card.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      for(key in _tmpDrgSrc.ctrls) {
        _tmpDrgSrc.ctrls[key].draw(_tmpDrgSrc.ctrls[key].currentValue);
        _tmpDrgSrc.ctrls[key].init();
      }
      for(key in _this.ctrls) {
        _this.ctrls[key].draw(_this.ctrls[key].currentValue);
        _this.ctrls[key].init();
      }
    } 
    return false;
  }, false);
  this.card.addEventListener('dragend', function(e) {
    this.style.opacity = '1.0';
    this.classList.remove('dragenter');
  }, false);

}
