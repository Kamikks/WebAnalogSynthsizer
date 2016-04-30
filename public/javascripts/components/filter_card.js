class FilterCard extends Card {
  initCtrls() {
    this.createKnob(2, LARGE, 'FREQUENCY', 200);
    this.createKnob(2, LARGE, 'Q', 120);
  }

  play(prev) {
    this.audioNode = context.createBiquadFilter();
    this.audioNode.type = this.type
    // frequency: 0 - 10000
    this.audioNode.frequency.value = (this.ctrls['FREQUENCY'].currentValue - 120) * 100 / 3 
    // q: 0 - 1000
    this.audioNode.Q.value = (this.ctrls['Q'].currentValue - 120) / 300
    prev.connect(this.audioNode);
    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode);
    }
  }

  postSend() {
    // NOP
  }

  stop() {
    // NOP
  }
}

