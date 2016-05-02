class OscCard extends Card {
  initCtrls() {
    this.createKnob(3, LARGE, 'TUNE', 270);
    this.createKnob(3, MIDDLE, 'OCT', 270);
  }

  connect(next) {
    this.createKnob(3, MIDDLE, 'SEND', 300); 
    next.prev = this;
    this.next[0] = next;
  }

  play(freq) {
    this.audioNode = context.createOscillator();
    this.audioNode.frequency.value = freq *
      Math.pow(1.0595, (this.ctrls['TUNE'].currentValue - 270) / 10) *
      Math.pow(1.0595, 12 * Math.floor((this.ctrls['OCT'].currentValue - 270) / 50));
    this.audioNode.type = this.type;
    var sendLevel  = context.createGain();
    this.audioNode.connect(sendLevel);
    sendLevel.gain.value = (this.ctrls['SEND'].currentValue - 120) / 300;
    this.next[0].play(sendLevel);
    this.audioNode.start(0);
    this.next[0].postSend();
  }

  stop() {
    this.next[0].stop();
    var currentTime = context.currentTime;
    this.audioNode.stop(currentTime + 1);
  }
}

