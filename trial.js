function Trial(game){
  var delayText = new DelayText(game);
  this.game = game;
  this.moleculeName = [];
  this.currentQuestionText = [];
  this.currentMolecule = [];
  this.molecule = [];
  this.copyMolecule = [];
  this.text = [];
  this.isAsked = false;
  this.score = 0;
  this.difficulty = 0;
  this.familiarity = 0;
  this.repeat = -1;
  this.feedbackText = [];
  this.alreadyAdded = false;
  this.maxScore = 1;

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
      return false;
    }
    return true;
  }

// checks if all unique atoms are there
  this.checkUniqueAtoms = function(){
    var values = this.determineUniqueAtoms();

    let set2 = new Set();
    for(var i=0; i < this.currentMolecule.length; i++){
      set2.add(this.currentMolecule[i].value);
    }

    if (values.size !== set2.size) {
      return false;
    }
    for (var a of values) {
      if (!set2.has(a)) {
        return false;
      }
    }
    return true;

  };

// checks if the amount of unique atoms is right
  this.checkAmountOfTypeOfAtoms = function(){
    for(var j=0; j< currentQuestion.molecule.length; j++){
      console.log(currentQuestion.molecule);
			if(countNumberOfAtoms(currentQuestion.molecule, currentQuestion.molecule[j].value) != countNumberOfAtoms(currentQuestion.currentMolecule, currentQuestion.molecule[j].value)){
					return false;
			}
		}
    return true;
  }

// de rest moet true zijn anders gaat dit fout
  this.checkConnections2 = function(){
    var copyMolecule = [];
    for(var i=0; i< this.currentMolecule.length; i++){
      copyMolecule.push(this.currentMolecule[i]);
    }
    console.log(copyMolecule);
    this.molecule.sort(function(a, b){
        return a.value < b.value;
    });
    this.currentMolecule.sort(function(a, b){
        return a.value < b.value;
    });
    var boolean = false;
    console.log(this.molecule, this.currentMolecule);
    for(var i=0; i<this.molecule.length; i++){
      var boolean = this.findCorrectMatch(this.molecule[i]);
    }
    console.log(copyMolecule);
    for(var i=0; i < copyMolecule.length; i++){
      this.currentMolecule.push(copyMolecule[i]);
    }
    return boolean;
  };

  this.findCorrectMatch = function(atom){
    atom.neighbour.sort(function(a, b){
        return a.value < b.value;
    });
    for(var i=0; i<this.currentMolecule.length; i++){
      if(this.currentMolecule[i].value == atom.value){
        this.currentMolecule[i].neighbour.sort(function(a, b){
            return a.value < b.value;
        });
        if(equalLists(atom.neighbour, this.currentMolecule[i].neighbour)){
          this.currentMolecule.splice(i,1);
          return true;
        }
      }
    }
    return false;
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
    this.setPropertiesQuestion();
  };

  this.setPropertiesQuestion = function(){
    if(this.repeat != -1 && uniqueButtons){
      this.makeButtons();
      uniqueButtons = false;
      giveHints = false;
      hintConnections = false;
    }
    else if(this.repeat != -1 && hintConnections){
      giveHints = true;
    }
    else{
      uniqueButtons = false;
      giveHints = false;
      hintConnections = false;
      makeButtons();
    }
  }

  this.determineCovalence = function(){
    for(var i=0; i < this.molecule.length; i++){
      this.molecule[i].determineCovalence();
    }
  }

  this.determineUniqueAtoms = function(){
    let set = new Set();
    for(var i=0; i< this.molecule.length; i++){
      set.add(this.molecule[i].value);
    }
    return set;
  };

  this.determineCurrentUnique = function(){
    let set = new Set();
    for(var i=0; i< this.currentMolecule.length; i++){
      set.add(this.currentMolecule[i].value);
    }
    return set;
  };

  this.determineDifficulty = function(){
    var numberOfAtoms = 0;
    for(var i=0; i< this.molecule.length; i++){
      numberOfAtoms = numberOfAtoms + 1;
    }
    var numberOfUniqueAtoms = this.determineUniqueAtoms().size;
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
    for(elem of values){
      for(var j=0; j < buttons.length; j++){
        if(buttons[j].indexOf(elem) > -1){
          var buttonTest = new button(buttons[j], elem, 30, positionY[j]);
        }
      }
    }
  };

}
