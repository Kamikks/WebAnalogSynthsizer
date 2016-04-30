class DestCard extends Card {
  initCtrls() {
    this.createKnob(1, LARGE, 'MASTER', 400);
  }

  connect() {
    //nop
  }
  disconnect() {
    //nop
  }
  play(prev) {
    this.audioNode = context.createGain();
    this.audioNode.gain.value = (this.ctrls['MASTER'].currentValue - 120) / 300;
    prev.connect(this.audioNode);
    this.audioNode.connect(context.destination);
  }
}

