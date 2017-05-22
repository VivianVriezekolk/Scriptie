function Atom(value, currentAtom, id, game) {
    this.value = value
		this.neighbour = [];
		this.id = id;
    this.game = game;
		if(currentAtom){
      console.log(game.world.centerX + ", " + game.world.centerY);
      var Xrandom = determineXPositionInGrid();
      var Yrandom = determineYPositionInGrid();
      console.log("X is " + Xrandom + ", Y is " + Yrandom);
			this.sprite = game.add.sprite(Xrandom, Yrandom, value);
      this.sprite.inputEnabled = true;
  		this.sprite.input.enableDrag();
  		this.sprite.input.enableDrag(true);
  		this.sprite.input.enableSnap(32, 32, false, true);
      this.sprite.events.onDragStop.add(deleteAtom, this);
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

		// this function adds a connection between atoms.
		this.addConnection = function(snappedAtom){
				if(!atomsAreSnapped(this, snappedAtom)){
					  this.neighbour.push(snappedAtom);
				}
			}

		// this function removes a connection between atoms.
		this.removeConnection = function(lostAtom){
			for(var i=0; i<this.neighbour.length; i++){
				if(this.neighbour[i].value == lostAtom.value){
					console.log(lostAtom.value + " is removed from " + this.value);
					console.log(lostAtom.id + " is removed from " + this.id);
					this.neighbour.splice(i, 1);
				}
			}
		}
}
