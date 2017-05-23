function Trial(game, group){
  var delayText = new DelayText(game);
  this.group = group;
  this.game = game;
  this.currentQuestionText = [];
  this.currentMolecule = [];
  this.molecule = [];
  this.copyMolecule = [];
  this.text = [];
  this.isAsked = false;
  this.score = 0;
  this.difficulty = 0;
  this.familiarity = 0;
  this.repeat = false;

  // this does not work but I do not understand why not.
  this.checkTheAnswer = function(){
    this.copyMolecule = this.molecule;
    console.log(this.currentMolecule);
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
      console.log(currentMolecule.length);
    return game.checkNeighbours();
  };

  // this does not work but I do not understand why not.
  this.evaluateAnswer = function(){
  	if(checkTheAnswer()){
  		var textAnswer = document.getElementById('textAnswer');
  		textAnswer.innerText = 'Great job!';
  		popup.style.display = 'block';
  	}
  	else{
  		var textAnswer = document.getElementById('textAnswer');
  		textAnswer.innerText = 'You did not make the correct molecule';
  		popup.style.display = 'block';
  		console.log('You did not make the correct molecule.');
  		this.molecule = this.copyMolecule;
  		console.log(molecule);
  	}
    console.log(currentMolecule.length);
  	for(var i=0; i< currentMolecule.length; i++){
      console.log("hoi");
  		currentMolecule[i].sprite.destroy();
  	}
  	currentMolecule = [];
  };

  this.finishGame = function(){
    this.currentQuestionText = [];
    this.repeat = false;
    this.currentMolecule = [];
  //  this.molecule = [];
    this.text = [];
  }

// checks the amount of atoms
  this.checkAmountOfAtoms = function(){
    if(this.currentMolecule.length != this.molecule.length){
      feedbackText = 'You do not have the right amount of atoms!';
      currentQuestion.repeat = true;
      return false;
    }
  }

// checks the type of atoms
  this.checkTypeOfAtoms = function(){
    for(var j=0; j< currentQuestion.currentMolecule.length; j++){
			if(game.countNumberOfAtoms(currentQuestion.molecule, currentQuestion.molecule[j].value) != game.countNumberOfAtoms(currentQuestion.currentMolecule, currentQuestion.molecule[j].value)){
					feedbackText = 'You do not have the right types of atoms';
					currentQuestion.repeat = true;
					return false;
			}
		}
  }

// should check the connections of the atoms (maar hou rekening mee dat de lengte van de moleculen wellicht niet even lang zijn, dus loop over currentMolecule)
  this.checkConnections = function(){

  }

  // Na deze drie functies te hebben aangeroepen kun je aan de hand van de true en false waardes uitrekenen hoe vaak een vraag wellicht gesteld moet worden en wanneer.

  this.showQuestion = function(){
    var style = { font: '14px Arial', fill: "#000000", align: "center" };
    var content = ["Mission: " + this.currentQuestionText];
    missionpopup.style.display = 'block';
    delayText.wordIndex = 0;
    delayText.lineIndex = 0;
    delayText.content = content;
    missionText.innerText = "";
    delayText.nextLine();
    this.makeButtons();
  };

  this.determineUniqueAtoms = function(){
    var numberOfUniqueAtoms = 1;
    var values = [];
    values.push(this.molecule[0].value);
    console.log(this.molecule[0].value);
    for(var i=1; i < this.molecule.length; i++){
      if(!values.includes(this.molecule[i].value)){
        numberOfUniqueAtoms = numberOfUniqueAtoms + 1;
        values.push(this.molecule[i].value);
      }
    }
    console.log(values[0]);
    return values;
  };

  this.determineDifficulty = function(){
    var numberOfAtoms = 0;
    for(var i=0; i< this.molecule.length; i++){
      numberOfAtoms = numberOfAtoms + 1;
    }
    var numberOfUniqueAtoms = this.determineUniqueAtoms().length;
    this.difficulty = +numberOfAtoms - +this.familiarity + +numberOfUniqueAtoms;
    console.log("Difficulty: " + this.difficulty);
  };

  this.removeButtons = function(){
    for(var i=0; i < buttonsList.length; i++){
  	   buttonsList[i].destroy();
    }
  }

  this.makeButtons = function(){
    this.removeButtons();
    var values = this.determineUniqueAtoms();
    for(var i=0; i < values.length; i++){
      for(var j=0; j < buttons.length; j++){
        if(buttons[j].indexOf(values[i]) > -1){
          var buttonTest = new button(buttons[j], values[i], 30, positionY[j]);
        }
      }
    }

  };

}
