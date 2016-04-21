function Knob(parent, label, size, color) {
  this.turning = false;
  this.canvas = document.createElement('canvas');
  parent.appendChild(this.canvas);
  this.currentValue = 0;
  this.canvas.title = label;
  if (size==LARGE) {
    this.canvas.width = 128, this.canvas.height = 70;
    this.x = 64, this.y = 40, this.rad = 30;
  } else if (size==MIDDLE) {
    this.canvas.width = 48, this.canvas.height = 70;
    this.x = 24, this.y = 35, this.rad = 15;
  }
  this.color = color;

  //create label
  this.label = document.createElement('div');
  this.label.textContent = label;
  this.label.style.fontSize = 'smaller';
  this.label.style.textAlign = 'center';
  parent.insertBefore(this.label, this.canvas);

  var proto = Knob.prototype;
  proto.draw = function(value) {
    if( ! this.canvas || ! this.canvas.getContext ){ return false ;}
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 11;
    ctx.strokeStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 60 * Math.PI / 180, 120 * Math.PI / 180, true);
    ctx.stroke();

    if( value >= 120 ) {
      if (value >= 420) { value = 420; }
      ctx.lineWidth = 10;
      ctx.strokeStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.rad, value * Math.PI / 180, 120 * Math.PI / 180, true);
      ctx.stroke();
      this.currentValue = value;
    }
  }

  var _this = this
  var _currentValue = 0;

  this.canvas.addEventListener("mousedown", function(e) {
    _this.turning = true;
    originY = e.clientY;
    _currentValue = _this.currentValue;
  });

  window.addEventListener("mousemove", function(e) {
    if(_this.turning) {
      _this.draw((originY - e.clientY)*2 + _currentValue);
      e.preventDefault();
    }
  });

  window.addEventListener("mouseup", function(e) {
    if(_this.turning) {
      _this.turning = false;
    }
  });
}
