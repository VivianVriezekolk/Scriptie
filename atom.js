function Atom(value, currentAtom, id, game) {
    this.value = value
		this.neighbour = [];
		this.id = id;
    this.game = game;
    this.sprite = [];
    this.covalence = [];
    this.connected = 0;
		if(currentAtom){
      console.log(game.world.centerX + ", " + game.world.centerY);
      var Xrandom = determineXPositionInGrid();
      var Yrandom = determineYPositionInGrid();
      console.log("X is " + Xrandom + ", Y is " + Yrandom);
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
        console.log("hallo");
      }
      else{
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
    }

    this.determineCovalence = function(){
      console.log(evaluateAnswer);
      if(!evaluateAnswer){
        for(var i=0; i < atomValues.length; i++){
          if(this.value == atomValues[i]){
            console.log("value " + this.value + ", covalence " + covalences[i]);
            return covalences[i];
          }
        }
      }
    }

		// this function adds a connection between atoms.
		this.addConnection = function(snappedAtom){
      console.log(this.connected, snappedAtom.connected);
			if(!atomsAreSnapped(this, snappedAtom)){
        this.connected += 1;
        //snappedAtom.connected += 1;
				this.neighbour.push(snappedAtom);
        //this.sprite.tint = 0xFF0000;
        //snappedAtom.sprite.tint = 0xFF0000;
        console.log(this.neighbour.connected);
			}
		}

		// this function removes a connection between atoms.
		this.removeConnection = function(lostAtom){
			for(var i=0; i<this.neighbour.length; i++){
				if(this.neighbour[i].value == lostAtom.value){
          console.log(this.neighbour[i].connected);
          if(this.connected > 0){
            this.connected -= 1;
          }
          console.log(this.neighbour[i].connected);
					console.log(lostAtom.value + " is removed from " + this.value);
					console.log(lostAtom.id + " is removed from " + this.id);
					this.neighbour.splice(i, 1);
          var colour = '0x' + (Math.random().toString(16) + "000000").substring(2,8);
          console.log(colour);
        }
			}
		}
}
