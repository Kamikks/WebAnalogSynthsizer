// Model
function DelayCardModel(params) {
  params.deckId = 'deck3';
  ProtoCardModel.call(this, params);
  Object.setPrototypeOf(DelayCardModel.prototype, ProtoCardModel.prototype);
  this.addKnob({name: 'Time', id: this.name + '_DELAYTIME', size: LARGE, value: 270, color: this.color});
  this.addKnob({name: 'Feedback', id: this.name + '_DELAYFB', size: LARGE, value: 270, color: this.color});
  this.addKnob({name: 'DryWet', id: this.name + '_DELAYDRYWET', size: LARGE, value: 150, color: this.color});
  this.audioNode = [];
}


DelayCardModel.prototype = {
  play : function(prev) {
    this.audioNode['dry'] = context.createGain();
    this.audioNode['wet'] = context.createGain();
    var feedback = context.createGain();
    var delay = context.createDelay() || context.createDelayNode();
    delay.delayTime.value = (this.ctrls['Time'].value - 120) / 300;
    var wet = (this.ctrls['DryWet'].value - 120) / 300;
    this.audioNode['wet'].gain.value = wet;
    this.audioNode['dry'].gain.value = 1 - wet; 
    feedback.gain.value = (this.ctrls['Feedback'].value - 120) / 300; 

    prev.connect(delay);
    delay.connect(this.audioNode['wet']);
    prev.connect(this.audioNode['dry']);
    delay.connect(feedback);
    feedback.connect(delay);

    for(var i = 0; i < this.next.length; i++) {
      this.next[i].play(this.audioNode);
    } 
  },

  stop : {},
  postSend: {}
}
