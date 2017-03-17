var button = function(element, X, Y){
  this.element = element;
  var button = game.add.button(X, Y, element, this.actionOnClick, this, 'C','C', 'C');
  button.scale.setTo(0.08, 0.08);
  console.log(molecule);


  this.actionOnClick = function(){
    console.log("You clicked on me!!");

    if(countNumberOfAtoms(currentMolecule, element) != countNumberOfAtoms(molecule, element)){
  		console.log(countNumberOfAtoms(molecule, element));
  		var atomNew = new atom(element, true);
  		atomNew.image.inputEnabled = true;
  		atomNew.image.input.enableDrag();
  		var scaleX = 0.02;
  		var scaleY = 0.02;
  		atomNew.image.scale.set(scaleX , scaleY);
  		atomNew.image.input.enableDrag(true);
  		atomNew.image.input.enableSnap(32, 32, false, true);
  		currentMolecule.push(atomNew);
  	}
  }



}
