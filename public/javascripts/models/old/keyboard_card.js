class KeyboardCard extends Card {
  initCtrls() {
    var _this = this;
    var key = 'KEYBOARD';
    var col = document.createElement('div');
    col.classList.add("col-md-12");
    col.classList.add("col-extend");
    this.innerRow.appendChild(col);
    this.ctrls[key] = document.createElement('webaudio-keyboard');
    this.ctrls[key].keys = 15;
    col.appendChild(this.ctrls[key]);
    this.ctrls[key].addEventListener('change', function(e) {
      if(e.note[0]){
	var freq = KEYC * Math.pow(1.0595, e.note[1]);
	//console.log(e.note[1]);
	for(var i = 0; i < _this.next.length; i++) {
	  _this.next[i].play(freq);
	}
      } else {
	for(var i = 0; i < _this.next.length; i++) {
	  _this.next[i].stop();
	}
      }
    });
  }

}
