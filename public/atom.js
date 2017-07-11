function Atom(value, inGrid, id, game) {
    this.value = value
		this.neighbour = [];
		this.id = id;
    this.game = game;
    this.sprite = [];
    this.covalence = [];
    this.connected = 0;

    // this function returns the X and Y position of an atom that is made by the player.
    function getXY() {
      var Xrandom = determineXPositionInGrid();
      var Yrandom = determineYPositionInGrid();
      for (var i=0; i<currentQuestion.currentMolecule.length; i++) {
        var atom = currentQuestion.currentMolecule[i];
        if (atom.sprite.x == Xrandom && atom.sprite.y == Yrandom)
          return getXY();
      }
      return [Xrandom,Yrandom];
    }

    // this if statement checks whether the atom needs to be in the grid and makes it draggable and gives it a tint.
		if(inGrid){
      var xy = getXY();
      var Xrandom = xy[0];
      var Yrandom = xy[1];
      this.sprite = game.add.sprite(Xrandom, Yrandom, value);
      this.sprite.scale.setTo(0.65, 0.65);
      this.sprite.inputEnabled = true;
  		this.sprite.input.enableDrag();
  		this.sprite.input.enableDrag(true);
  		this.sprite.input.enableSnap(32, 32, false, true);
      this.sprite.events.onDragStop.add(deleteAtom, this);
      this.sprite.tint = 0xFFFFFF;
		}

    // this function determines the X position of a new atom in the grid.
    function determineXPositionInGrid(){
      var Xrandom = Math.floor((Math.random() * (640-110)) + 110);
      while(Xrandom % 32 != 0){
        Xrandom = Math.floor((Math.random() * (640-110)) + 110);
      }
      return Xrandom;
    }

    // this function makes this sprite undraggable.
    this.makeUndraggable = function(){
      this.sprite.inputEnabled = false;
      this.sprite.input.draggable = false;
      this.sprite.input.enableDrag(false);
    }

    // this function determines the Y position of an new atom in the grid.
    function determineYPositionInGrid(){
      var Yrandom = Math.floor((Math.random() * (455-5)) + 5);
      while(Yrandom % 32 != 0){
        Yrandom = Math.floor((Math.random() * (455-5)) + 5);
      }
      return Yrandom;
    }

    // this function determines which tint a this atom needs to have.
    this.determineTint = function(){
      if(this.connected == 0 && !boolEvaluateAnswer){
        this.sprite.tint = 0xFFFFFF;
      }
      else{
        if(currentQuestion.giveHints){
          if(this.connected == this.covalence && !boolEvaluateAnswer){
            this.sprite.tint = 0x009933;
          }
          else if(this.connected < this.covalence && !boolEvaluateAnswer){
            this.sprite.tint = 0xccff99;
          }
          else if(this.connected > this.covalence && !boolEvaluateAnswer){
            this.sprite.tint = 0xff0000;
          }
        }
        else{
          if(!boolEvaluateAnswer){
            this.sprite.tint = 0xAAAAAA;
          }
        }
      }
    }

    // this function puts all the covalences of all the atoms that exist in this game in an array covalences.
    this.determineCovalence = function(){
      if(!boolEvaluateAnswer){
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
