class Card {
  constructor(val) {
    this.next = [];
    this.card = null;
    this.innerRow = null;
    this.prev = null;
    this.name = val.name;
    this.type = val.type;
    this.color = val.color;
    this.ctrls = new Object();
    this.sendtoBtn = null;
    this.closeBtn = null;
    this.audioNode = null;
    this.sendNode = null;
    this.sendTo = null;

    // Create DOM
    if(val.obj != null) {
      this.card = val.obj.card;
      this.next = val.obj.next;
      this.prev = val.obj.prev; 
      this.innerRow = val.obj.innerRow;
      this.type = val.obj.type;
      this.audioNode = val.obj.audioNode;
      this.color = val.obj.color;
      this.name = val.obj.name;
      this.sendtoBtn = val.obj.sendtoBtn;
      this.closeBtn = val.obj.closeBtn;
      this.ctrls = val.obj.ctrls;
      this.sendNode = val.obj.sendNode;
      this.sendTo = val.obj.sendTo;
    } else {
      this.initDom(val.deck);
      this.initCtrls();
      this.initEventListener();
    }
  }

  createKnob(num, size, key, defVal) {
    var col = document.createElement('div');
    col.classList.add("col-md-" + 12 / num);
    col.classList.add("col-extend");
    col.id = this.name + '_' + key + '_col';
    this.innerRow.appendChild(col);
//    this.ctrls[key] = new Knob(col, key, this.name + '_'+key, size, this.color);
//    this.ctrls[key].draw(defVal);
    this.ctrls[key] = KnobModel.add({cardId: col.id, name: key, id: this.name + '_' + key, size: size, value: defVal, color: this.color});
  }

  initDom(deck) {
    this.card = document.createElement('div');
    this.card.classList.add("card");
    this.card.draggable = true;
    deck.appendChild(this.card);
    var cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header");
    cardHeader.style.borderLeft = "10px solid " + this.color;
    cardHeader.textContent = this.name;
    this.closeBtn = document.createElement('button');
    this.closeBtn.type = "button"
    this.closeBtn.classList.add("btn");
    this.closeBtn.classList.add("btn-default");
    this.closeBtn.classList.add("close-btn");
    cardHeader.appendChild(this.closeBtn);
    this.sendtoBtn = document.createElement('button');
    this.sendtoBtn.type = "button"
    this.sendtoBtn.classList.add("btn");
    this.sendtoBtn.classList.add("btn-default");
    this.sendtoBtn.classList.add("close-btn");
    cardHeader.appendChild(this.sendtoBtn);
    this.card.appendChild(cardHeader);
    var cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    this.card.appendChild(cardBody);
    this.innerRow = document.createElement('div');
    this.innerRow.classList.add("row");
    this.innerRow.classList.add("row-extend");
    cardBody.appendChild(this.innerRow);

    // create modal dialog
    this.sendto = document.createElement('div');
    this.sendto.classList.add("modal");
    this.sendto.classList.add("fade");
    this.sendto.setAttribute("role", "dialog");
    this.sendto.id = this.name + "-sendto";
    this.card.appendChild(this.sendto);
    var modalDialog = document.createElement('div');
    modalDialog.classList.add("modal-dialog"); 
    this.sendto.appendChild(modalDialog);
    var modalContent = document.createElement('div');
    modalContent.classList.add("modal-content");
    modalDialog.appendChild(modalContent);
    var modalBody = document.createElement('div');
    modalBody.classList.add("modal-body");
    modalContent.appendChild(modalBody);
    this.modalSelect = document.createElement('select');
    this.modalSelect.classList.add("form-control");
    this.modalSelect.id = this.name + "-sendto-select";
    modalBody.appendChild(this.modalSelect);
    var modalFooter = document.createElement('div'); 
    modalFooter.classList.add("modal-footer");
    modalContent.appendChild(modalFooter);
    var modalClose = document.createElement('button');
    modalClose.type = "button";
    modalClose.classList.add("btn");
    modalClose.classList.add("btn-default");
    modalClose.setAttribute("data-dismiss", "modal");
    modalClose.textContent = "Close";
    modalFooter.appendChild(modalClose);
    this.modalBtn = document.createElement('button');
    this.modalBtn.type = "submit";
    this.modalBtn.classList.add("btn");
    this.modalBtn.classList.add("btn-primary");
    this.modalBtn.textContent = "Select";
    modalFooter.appendChild(this.modalBtn);
  }

  initEventListener() {
    // Define EventListener
    // TODO: integrate definition of each card
    var _this = this;
    var insertTo = document.createElement('div')
    this.card.addEventListener('dragstart', function(e) {
      this.style.opacity = '0.4';
      _tmpDrgSrc = this;
      e.dataTransfer.effectAllowed = 'move';
    }, false);
    this.card.addEventListener('dragenter', function(e) {
      if(this != _tmpDrgSrc) { 
	this.parentNode.insertBefore(insertTo, this);
	insertTo.classList.add('dragenter');
      }
    }, false);
    insertTo.addEventListener('dragleave', function() {
      this.classList.remove('dragenter');
      this.parentNode.removeChild(this);
    }, false); 
    insertTo.addEventListener('dragover', function(e) {
      if(e.preventDefault) {
	e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';  
    }, false);
    insertTo.addEventListener('drop', function(e) {
      if(e.stopPropagation) {
	e.stopPropagation();
      }
      if(_tmpDrgSrc != _this.card) {
	_this.card.parentNode.insertBefore(_tmpDrgSrc, _this.card);
	_tmpDrgSrc.style.opacity = '1.0';
	this.classList.remove('dragenter');
	this.parentNode.removeChild(this);
      }
      return false;
    }, false);
  
    this.sendtoBtn.addEventListener('click', function() {
      for(var i=0; i<osc.length; i++) {
        var option = document.createElement('option');
        option.value="OSC_" + i;
        option.textContent = osc[i].name;
        _this.modalSelect.appendChild(option);
      }
      for(var i=0; i<env.length; i++) {
        var option = document.createElement('option');
        option.value="ENV_" + i;
        option.textContent = env[i][0].name;
        _this.modalSelect.appendChild(option);
      }
      for(var i=0; i<filter.length; i++) {
        var option = document.createElement('option');
        option.value="FILTER_" + i;
        option.textContent = filter[i].name;
        _this.modalSelect.appendChild(option);
      }
      var option = document.createElement('option');
      option.value= "DEST_0";
      option.textContent = dest.name;
      _this.modalSelect.appendChild(option);

      $("#" + _this.name + "-sendto").modal("show");
    });

    this.closeBtn.addEventListener('click', function() {
      _this.disconnect();
      _this.card.parentNode.removeChild(_this.card);
    });

    this.modalBtn.addEventListener('click', function() {
      $("#" + _this.name + "-sendto").modal("hide");
      var send = $("#" + _this.name + "-sendto-select").val().split("_");
      // TODO if this and sendto is same, cannot connect each other
      // TODO if env[send[1]][x] is not used, don't create new one and use it.
      // TODO use eval instead of switch 
      _this.disconnect();
      var i = parseInt(send[1]);
      switch(send[0]) {
        case "OSC":
          _this.connect(osc[i]);
          break;
        case "ENV":
          console.log("connect to env");
          var j = env[i].length;
          var target = null;
          var env_next = null;
          for(var k=0; k<j; k++) {
            if(env[i][k].next[0] == null) {
              target = env[i][k];
            } else {
              env_next = env[i][k].next[0];
            }
          }
          if(target == null) {
            env[i][j] = new EnvCard({obj: env[i][0]});
            target = env[i][j];
            env_next = env[i][0].next[0];
          }
          // next is same as env[send[1]][0]
          _this.connect(target);
          break;
        case "FILTER":
          console.log("connect to filter");
          _this.connect(filter[i]);
          break;
        case "DEST":
          _this.connect(dest);
          break;
      }
      // unforcus selected item
      $("#cardSelector").each(function() {
        $(_this).children('option').removeAttr('selected');
        _this.selectedIndex = 0;
      });
    });
  }

  initCtrls() {
  }

  connect(next) {
    var i = this.next.length;
    next.prev = this;
    this.next[i] = next;
  }

  // TODO clear object from memory
  disconnect() {
    if (this.prev && this.prev.next.indexOf(this.card)) {
      this.prev.next.splice(this.prev.next.indexOf(this.card), 1);
    }
  }

  postSend() {
  }

  play(freq) {
  }


  stop() {
  }
}

