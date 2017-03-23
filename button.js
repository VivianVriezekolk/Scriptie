var button = function(buttonName, element, X, Y){
  console.log('hallo');
  this.element = element;
  this.buttonName = buttonName;
  //console.log(molecule);

  this.actionOnClick = function(){
    console.log("You clicked on me!!");
    if(countNumberOfAtoms(currentMolecule, element) != countNumberOfAtoms(molecule, element)){
  		console.log(countNumberOfAtoms(molecule, element));
  		var atomNew = new atom(element, true);
  		atomNew.sprite.inputEnabled = true;
  		atomNew.sprite.input.enableDrag();
  		atomNew.sprite.input.enableDrag(true);
  		atomNew.sprite.input.enableSnap(32, 32, false, true);
  		currentMolecule.push(atomNew);
  	}
  };

  var button = game.add.button(X, Y, buttonName, this.actionOnClick, this);
  button.scale.setTo(0.4, 0.4);
}
