function OscCard(parent, name, type, color) {
  this.nextCard = [];
  this.tune = null;
  this.sender = null;
  this.name = name;
  this.osc = null;
  this.oct = null;

  var card = document.createElement('div');
  card.classList.add("card");
  parent.appendChild(card);
  var cardHeader = document.createElement('div');
  cardHeader.classList.add("card-header");
  cardHeader.style.borderLeft = "10px solid " + color;
  cardHeader.textContent = name;
  card.appendChild(cardHeader);
  var cardBody = document.createElement('div');
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);
  var innerRow = document.createElement('div');
  innerRow.classList.add("row");
  cardBody.appendChild(innerRow);

  var colTune = document.createElement('div');
  colTune.classList.add("col-md-4");
  colTune.classList.add("col-extend");
  innerRow.appendChild(colTune);
  this.tune = new Knob(colTune, 'TUNE', LARGE, color);
  this.tune.draw(270);

  var colOct = document.createElement('div');
  colOct.classList.add("col-md-4");
  colOct.classList.add("col-extend"); 
  innerRow.appendChild(colOct);
  this.oct = new Knob(colOct, 'OCT', MIDDLE, color);
  this.oct.draw(270);


  this.connect = function(nextCard) {
    var colSender = null;
    colSender = document.createElement('div');
    colSender.classList.add("col-md-4");
    colSender.classList.add("col-extend");
    innerRow.appendChild(colSender);
    this.sender = new Knob(colSender, nextCard.name, MIDDLE, color)
    this.sender.draw(300);
    this.nextCard[0] = nextCard;
  }

  this.play = function(freq) {
    this.osc = context.createOscillator();
    this.osc.frequency.value = freq * Math.pow(1.0595, (this.tune.currentValue - 270) / 10) * Math.pow(1.0595, 12 * Math.floor((this.oct.currentValue - 270) / 50));
    this.osc.type = type;
    var sendLevel = null 
    sendLevel = context.createGain();
    this.osc.connect(sendLevel);
    sendLevel.gain.value = (this.sender.currentValue - 120) / 300;
    this.nextCard[0].play(sendLevel);

    this.osc.start(0);
 
    this.nextCard[0].postSend();

    console.log("1 nextCard: " + this.nextCard[0]);
  }

  this.stop = function() {
    console.log("2: nextCard: " + this.nextCard[0]);
    this.nextCard[0].stop();
    var currentTime = context.currentTime;
    var _this = this;
    console.log("Name: " + this.name + ", currentTime: " + currentTime);
//    setTimeout(function() {
      console.log("Name: " + _this.name + "is stopped");
      _this.osc.stop(currentTime + 1);
//    }, 1000);
//    window.setInterval(function() {
//      console.log("check");
//      if(context.currentTime - currentTime > 3) {
//        console.log("stop");
//        _this.osc.stop(0);
//      }
//    }, 1000);
  }
}

