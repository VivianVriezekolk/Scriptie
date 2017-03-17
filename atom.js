atom = function(value, currentAtom) {
    this.value = value
		if(currentAtom){
			this.image = game.add.sprite(5, 100, value);
	}
};
