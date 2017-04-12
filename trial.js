function Trial(game){
  this.game = game;
  this.currentQuestionText = [];
  this.currentMolecule = [];
  this.molecule = [];
  this.text = [];

  this.makeButtons = function(){

  }

// this does not work but I do not understand why not.
  this.evaluateAnswer = function(){
  	if(checkTheAnswer()){
  		var textAnswer = game.document.getElementById('textAnswer');
  		textAnswer.innerText = 'Great job!';
  		popup.style.display = 'block';
  	}
  	else{
  		var textAnswer = document.getElementById('textAnswer');
  		textAnswer.innerText = 'You did not make the correct molecule';
  		popup.style.display = 'block';
  		console.log('You did not make the correct molecule.');
  		molecule = game.copyMolecule;
  		console.log(molecule);
  	}
  	for(var i=0; i< this.currentMolecule.length; i++){
      console.log("hoi");
  		currentMolecule[i].sprite.destroy();
  	}
  	currentMolecule = [];
  }

// this does not work but I do not understand why not.
  this.checkTheAnswer = function(){
    game.copyMolecule = molecule;
    if(currentMolecule.length != molecule.length){
      console.log('You do not have the right amount of atoms!');
      return false;
    }
    console.log('You have the right amount of atoms!');
    for(var j=0; j< molecule.length; j++)
      if(game.countNumberOfAtoms(molecule, molecule[j].value) != game.countNumberOfAtoms(currentMolecule, molecule[j].value)){
          console.log('You do not have the right types of atoms');
          return false;
      }
    return game.checkNeighbours();
  }

  this.showQuestion = function(){
    if(text != undefined){
      game.world.remove(text);
    }
    var style = { font: "15px Arial", fill: "#000000", align: "center" };
    text = game.add.text(game.world.centerX, 550, this.currentQuestionText, style);
    text.anchor.set(0.5);
  }

}
