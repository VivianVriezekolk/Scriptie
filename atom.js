function atom(value, currentAtom, id) {
    this.value = value
		this.neighbour = [];
		this.id = id;
		if(currentAtom){
			this.sprite = game.add.sprite(5, 100, value);
		}

		// this function adds a connection between atoms.
		this.addConnection = function(snappedAtom){
				if(!atomsAreSnapped(this, snappedAtom)){
					console.log(this.value + " is connected to " + snappedAtom.value);
					this.neighbour.push(snappedAtom);
				}
			}

		// this function removes a connection between atoms.
		this.removeConnection = function(lostAtom){
			for(var i=0; i<this.neighbour.length; i++){
				if(this.neighbour[i].value == lostAtom.value){
					console.log(lostAtom.value + " is removed from " + this.value);
					this.neighbour.splice(i, 1);
				}
			}
		}
}
