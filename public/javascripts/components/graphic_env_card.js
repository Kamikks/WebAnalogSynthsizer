function Chart2() {
  this.canvas = document.getElementById("chart2");

  var proto = Chart2.prototype;
  proto.draw = function() {
    var ctx = this.canvas.getContext('2d');
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    var aLv = 0, aTm = 50, dLv = 100, dTm = 20, sLv = 40, rTm = 40;
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 110);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(30, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, 100 - aLv);
    ctx.lineTo(40 + aTm, 100 - dLv);
    ctx.lineTo(40 + aTm + dTm, 100 - sLv);
    ctx.lineTo(300 - rTm, 100 - sLv);
    ctx.lineTo(300, 100);
    ctx.stroke();
  }

  var _this = this;
  this.canvas.addEventListener("mousedown", function(e) {
  });
}

function Adsr() {
  this.canvas = document.getElementById("chart1")
  this.turning = false;
  var ctx = this.canvas.getContext('2d');
  var proto = Adsr.prototype

  proto.draw = function() {
    var data = {
      labels: ['Atack', '', 'Decay', '', 'Sustain', '', 'Release', '', ''],
      datasets: [
        {
          backgroundColor: "rgba(50, 205, 50, 0.5)",
          borderColor: "rgba(34, 139, 34, 1)",
          fillcolor: "rgba(220, 220, 220, 0.5)",
          strokeColor: "rgba(34, 139, 34, 0.5)",
          pointColor: "rgba(0, 100, 0, 1)",
          pointStrokeColor: "#fff",
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          tension: 0.1,
          data: [0, 50, 100, 100, 100, 100, 100, 10, 0]
        }
      ]
    };
    var options = {
      legend: {
        display: false
      }
    };
    this.chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });
  }

  var _this = this;
  var _currentValue = 0;
  var _index = null;

  this.canvas.addEventListener("mousedown", function(e) {
    if(_this.chart.getElementAtEvent(e)[0]) {
      _index = _this.chart.getElementAtEvent(e)[0]._index;
      _this.turning = true;
      _currentValue = _this.currentValue;
      originY = e.clientY;
    }
  });
  window.addEventListener("mousemove", function(e) {
    if(_this.turning) {
      _y = _this.chart.data.datasets[0].data[_index] + ((originY - e.clientY) / 10 );
      if(_index == 3) {
        next_y = _this.chart.data.datasets[0].data[_index + 1];
        if(_y < next_y) {
          _y = next_y;
        } else if(_y > 100) {
          _y = 100;
        }
      } else if(_index == 5) {
        release_y = _this.chart.data.datasets[0].data[_index + 2];
        if(_y < release_y) {
          _y = release_y;
        } else if(_y > 100) {
          _y = 100;
        }
        _this.chart.data.datasets[0].data[_index - 1] = _y;
        _this.chart.data.datasets[0].data[_index + 1] = _y;
      } else if(_index == 7) {
        prev_y = _this.chart.data.datasets[0].data[_index - 1];
        if(_y < 0) {
          _y = 0;
        } else if(_y > prev_y) {
          _y = prev_y;
        }
      } else if(_index == 2 || _index == 4 || _index == 6 || _index == 8) {
        _y = _this.chart.data.datasets[0].data[_index];
      } else {
        if(_y < 0) {
          _y = 0;
        } else if(_y > 100) {
          _y = 100;
        }
      }
      _this.chart.data.datasets[0].data[_index] = _y;
      _this.chart.update();
      e.preventDefault();
    }
  });

  window.addEventListener("mouseup", function(e) {
    if(_this.turning) {
      _this.turning = false;
    }
  });
}

