function Trial(game){
  var delayText = new DelayText(game);
  this.game = game;
  this.currentQuestionText = [];
  this.rightAnswerText = [];
  this.wrongAnswerText = [];
  this.currentMolecule = [];
  this.molecule = [];
  this.text = [];
  this.isAsked = false;
  this.score = 0;
  this.difficulty = 0;
  this.familiarity = 0;
  this.buttonList = [];

  // this does not work but I do not understand why not.
  this.checkTheAnswer = function(){
    game.copyMolecule = this.molecule;
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
  		molecule = game.copyMolecule;
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
    this.currentMolecule = [];
    this.molecule = [];
    this.text = [];
  }

  this.showQuestion = function(){
    this.makeButtons();
    var style = { font: '14px Arial', fill: "#000000", align: "center" };
    var content = ["Mission: " + this.currentQuestionText];
    missionpopup.style.display = 'block';
    delayText.wordIndex = 0;
    delayText.lineIndex = 0;
    delayText.content = content;
    missionText.innerText = "";
    delayText.nextLine();
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
    console.log(values[0] + " " + values[1]);
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

  this.makeButtons = function(){
    for(var i=0; i < this.buttonList.length; i++){
      var buttonI = this.buttonList[i];
      buttonI.destroy();
      this.buttonList.splice(i,1);
    }
    var values = this.determineUniqueAtoms();
    for(var i=0; i < values.length; i++){
      for(var j=0; j < buttons.length; j++){
        if(buttons[j].indexOf(values[i]) > -1){
          var buttonTest = new button(buttons[j], values[i], 30, positionY[j]);
          this.buttonList.push(buttonTest);
        }
      }
    }

  };

}
