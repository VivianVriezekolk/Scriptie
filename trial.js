function Trial(game){
  var delayText = new DelayText(game);
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
  this.repeat = 0;
  this.feedbackText = [];
  this.alreadyAdded = false;

  this.finishGame = function(){
    this.currentQuestionText = [];
    this.repeat = 0;
    this.currentMolecule = [];
    this.molecule = [];
    this.text = [];
  }

// checks the amount of atoms
  this.checkAmountOfAtoms = function(){
    if(this.currentMolecule.length != this.molecule.length){
      this.feedbackText = 'You do not have the right amount of atoms!';
      currentQuestion.repeat = 2;
      return false;
    }
    return true;
  }

  this.checkUniqueAtoms = function(){
    var values = this.determineUniqueAtoms();
    for(var i=0; i< values.length; i++){
      for(var j=0; j< this.currentMolecule.length; i++){
        if(values[i] == this.currentMolecule[j].value){
          values.splice(i,1);
        }
      }
    }
    if(values.length == 0){
      this.feedbackText = "You have all the unique atoms in the molecule";
      console.log("hallo");
      return true;
    }
    return false;
  }

// checks the type of atoms
  this.checkTypeOfAtoms = function(){
    for(var j=0; j< currentQuestion.currentMolecule.length; j++){
			if(countNumberOfAtoms(currentQuestion.molecule, currentQuestion.molecule[j].value) != countNumberOfAtoms(currentQuestion.currentMolecule, currentQuestion.molecule[j].value)){
					this.feedbackText = 'You do not have the right types of atoms';
					currentQuestion.repeat = 3;
					return false;
			}
		}
    return true;
  }

// should check the connections of the atoms (maar hou rekening mee dat de lengte van de moleculen wellicht niet even lang zijn, dus loop over currentMolecule)
  this.checkConnections = function(){
    for(var k=0; k< this.molecule.length; k++){
  		for(var f=0; f< this.currentMolecule.length; f++){
  			if(this.molecule[k].value == this.currentMolecule[f].value){
  				this.molecule[k].neighbour.sort(function(a, b){
  						return a.value < b.value;
  				});
  				for(var v=0; v<this.molecule[k].neighbour.length; v++){
  					console.log("neighbour: " + currentQuestion.molecule[k].neighbour[v].value);
  				}
  				this.currentMolecule[f].neighbour.sort(function(a, b){
  					return a.value < b.value;
  				});
  				if(!equalLists(this.molecule[k].neighbour, this.currentMolecule[f].neighbour)){
  					this.feedbackText = 'You do not have the right connections between the atoms.';
  					return false;
  				}
  				console.log(k);
  				// moet deze splice nou wel of niet? Want zonder deze gaat het wel goed, nog over nadenken!!
  				this.molecule.splice(k, 1);
  			}
  		}
  	}
  	this.molecule = this.copyMolecule;
  	return true;

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
