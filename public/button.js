function Button(buttonName, element, X, Y, game){
  this.element = element;
  this.buttonName = buttonName;

  this.actionOnClick = function(){
  		var atomNew = new Atom(element, true, game.id, game);
  		game.currentQuestion.currentMolecule.push(atomNew);
			id = id+1;
  }
  var button = game.add.button(X, Y, buttonName, this.actionOnClick, this);
  button.scale.setTo(0.4, 0.4);
}
