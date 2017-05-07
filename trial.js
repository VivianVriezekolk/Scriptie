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

  // this does not work but I do not understand why not.
  function checkTheAnswer(){
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
    //if(text != undefined){
    //  game.world.remove(text);
    //}
    var style = { font: '14px Arial', fill: "#000000", align: "center" };
    console.log(this.currentQuestionText);
    var content = ["Mission: " + this.currentQuestionText];
    console.log(content);
  //  text = content;
  //  text = game.add.text(game.world.centerX-160, 550, ' ', style); //550
    currentQuestion.score = 1;
    missionpopup.style.display = 'block';

    delayText.wordIndex = 0;
    delayText.lineIndex = 0;
    delayText.content = content;
    missionText.innerText = "";
    delayText.nextLine();
  };

}
