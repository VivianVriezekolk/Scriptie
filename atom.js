function Atom(value, currentAtom, id, game) {
    this.value = value
		this.neighbour = [];
		this.id = id;
    this.game = game;
    this.sprite = [];
    this.covalence = [];
    this.connected = 0;
		if(currentAtom){
      var Xrandom = determineXPositionInGrid();
      var Yrandom = determineYPositionInGrid();
      this.sprite = game.add.sprite(Xrandom, Yrandom, value);
      this.sprite.scale.setTo(0.65, 0.65);
      this.sprite.inputEnabled = true;
  		this.sprite.input.enableDrag();
  		this.sprite.input.enableDrag(true);
  		this.sprite.input.enableSnap(32, 32, false, true);
      this.sprite.events.onDragStop.add(deleteAtom, this);
      this.sprite.tint = 0xFFFFFF;
		}

    function determineXPositionInGrid(){
      var Xrandom = Math.floor((Math.random() * (640-110)) + 110);
      while(Xrandom % 32 != 0){
        Xrandom = Math.floor((Math.random() * (640-110)) + 110);
      }
      return Xrandom;
    }

    this.makeUndraggable = function(){
      this.sprite.inputEnabled = false;
      this.sprite.input.draggable = false;
      this.sprite.input.enableDrag(false);
    }

    function determineYPositionInGrid(){
      var Yrandom = Math.floor((Math.random() * (455-5)) + 5);
      while(Yrandom % 32 != 0){
        Yrandom = Math.floor((Math.random() * (455-5)) + 5);
      }
      return Yrandom;
    }

    this.determineTint = function(){
      if(this.connected == 0 && !evaluateAnswer){
        this.sprite.tint = 0xFFFFFF;
      }
      else{
        if(currentQuestion.giveHints){
          if(this.connected == this.covalence && !evaluateAnswer){
            this.sprite.tint = 0x009933;
          }
          else if(this.connected < this.covalence && !evaluateAnswer){
            this.sprite.tint = 0xccff99;
          }
          else if(this.connected > this.covalence && !evaluateAnswer){
            this.sprite.tint = 0xff0000;
          }
        }
        else{
          if(!evaluateAnswer){
            this.sprite.tint = 0xAAAAAA;
          }
        }
      }
    }

    this.determineCovalence = function(){
      if(!evaluateAnswer){
        for(var i=0; i < atomValues.length; i++){
          if(this.value == atomValues[i]){
            return covalences[i];
          }
        }
      }
    }

		// this function adds a connection between atoms.
		this.addConnection = function(snappedAtom){
  		if(!atomsAreSnapped(this, snappedAtom)){
        this.connected += 1;
				this.neighbour.push(snappedAtom);
  		}
		}

		// this function removes a connection between atoms.
		this.removeConnection = function(lostAtom){
			for(var i=0; i<this.neighbour.length; i++){
				if(this.neighbour[i].value == lostAtom.value){
          if(this.connected > 0){
            this.connected -= 1;
          }
        	this.neighbour.splice(i, 1);
          var colour = '0x' + (Math.random().toString(16) + "000000").substring(2,8);
        }
			}
		}
}
