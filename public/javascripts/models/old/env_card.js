class EnvCard extends Card {
  initCtrls() {
    var key = ['AttackTime', 'Decay', 'Time', 'Sustain', 'Release'];
    for(var i = 0; i < 5; i++) {
      this.createKnob(6, MIDDLE, key[i], 200);
    }
  }

  play(prev) {
    this.startTime = 0;
    this.audioNode = context.createGain();
    prev.connect(this.audioNode);
    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode);
    }
    // attackLevel: 0[s]
    this.startTime = context.currentTime;
    this.audioNode.gain.setValueAtTime(0, this.startTime);
  }

  postSend() {
    // TODO: create get currentValue method
    // attackTime: 0 - 3[s]
    var attackTime = this.startTime + parseFloat((this.ctrls['AttackTime'].currentValue - 120) / 100);
    // decayTime: 0 - 3[s]
    var decayTime = parseFloat((this.ctrls['Time'].currentValue - 120) / 100);
    var decayLevel = (this.ctrls['Decay'].currentValue - 120) / 300;
    // sustainLevel
    var sustainLevel = (this.ctrls['Sustain'].currentValue - 120) / 300;
    //attack
    this.audioNode.gain.linearRampToValueAtTime(decayLevel, attackTime);
    //decay
    this.audioNode.gain.setTargetAtTime(sustainLevel, attackTime, decayTime);
  }

  stop() {
    var currentTime = context.currentTime;
    this.audioNode.gain.cancelScheduledValues(currentTime);
    this.audioNode.gain.setValueAtTime(this.audioNode.gain.value, currentTime);
    // releaseTime: 0 - 3[s]
    var releaseTime = (this.ctrls['Release'].currentValue - 120) / 300;
    this.audioNode.gain.linearRampToValueAtTime(0, currentTime + releaseTime);
  }
}

