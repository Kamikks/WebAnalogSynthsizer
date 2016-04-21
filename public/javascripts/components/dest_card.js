function DestCard(name) {
  this.name = name;
  this.connect = function() {
    //nop
  }
  this.play = function(prev) {
    prev.connect(context.destination);
  }
}

