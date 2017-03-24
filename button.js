var button = function(buttonName, element, X, Y, game, currentMolecule, molecule){
  console.log('hallo');
  this.element = element;
  this.buttonName = buttonName;
  this.X = X;
  this.Y = Y;
  this.game = game;
  //console.log(molecule);

  this.actionOnClick = function(){
    console.log("You clicked on me!!");
    if(countNumberOfAtoms(currentMolecule, this.element) != countNumberOfAtoms(molecule, this.element)){
  		console.log(countNumberOfAtoms(molecule, this.element));
  		var atomNew = new atom(this.element, true);
  		atomNew.sprite.inputEnabled = true;
  		atomNew.sprite.input.enableDrag();
  		atomNew.sprite.input.enableDrag(true);
  		atomNew.sprite.input.enableSnap(32, 32, false, true);
  		currentMolecule.push(atomNew);
  	}
  };

  var button = this.game.add.button(this.X, this.Y, this.buttonName, this.actionOnClick, this);
  button.scale.setTo(0.4, 0.4);
}
