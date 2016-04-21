function KeyboardCard(parent, name, color) {
  this.nextCard = [];

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

  this.keyboard = document.createElement('webaudio-keyboard');
  this.keyboard.keys = 15;
  cardBody.appendChild(this.keyboard);

  this.connect = function(nextCard) {
    var i = this.nextCard.length;
    this.nextCard[i] = nextCard;
  }

  var _this = this;

  this.keyboard.addEventListener('change', function(e) {
    if(e.note[0]){
      var freq = KEYC * Math.pow(1.0595, e.note[1]);
console.log(e.note[1]);
      for(var i = 0; i < _this.nextCard.length; i++) {
        _this.nextCard[i].play(freq);
      }
    } else {
      for(var i = 0; i < _this.nextCard.length; i++) {
        _this.nextCard[i].stop();
      }
    }
  });
}
