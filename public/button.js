function Button(buttonName, element, X, Y, game){
  this.element = element;
  this.buttonName = buttonName;

  this.actionOnClick = function(){
    console.log("You clicked on me!!");
  //  if(countNumberOfAtoms(currentQuestion.currentMolecule, element) != countNumberOfAtoms(currentQuestion.molecule, element)){
  		console.log(countNumberOfAtoms(game.currentQuestion.molecule, element));
  		var atomNew = new Atom(element, true, game.id, game);
  		game.currentQuestion.currentMolecule.push(atomNew);
			id = id+1;
  	//}
  }
  var button = game.add.button(X, Y, buttonName, this.actionOnClick, this);
  button.scale.setTo(0.4, 0.4);
}
