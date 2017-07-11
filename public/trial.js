function Trial(game){
  var delayText = new DelayText(game);
  this.game = game;
  this.moleculeName = [];
  this.currentQuestionText = [];
  this.currentMolecule = [];
  this.molecule = [];
  this.text = [];
  this.isAsked = false;
  this.score = 0;
  this.difficulty = 0;
  this.familiarity = 0;
  this.repeat = -1;
  this.feedbackText = [];
  this.alreadyAdded = false;
  this.maxScore = 1;
  this.hintConnections = false;
  this.giveHints = false;
  this.uniqueButtons = false;
  this.helpText = [];
  this.helpNumber = false;
  this.endTime = 0;
  this.startTime = 0;
  this.answer = [];

  // This function determines the time needed for the player for this assignment to complete.
  this.determineTime = function(){
    return this.endTime - this.startTime;
  }

  // This function checks whether the current molecule has the right amount of atoms.
  this.checkAmountOfAtoms = function(){
    if(this.currentMolecule.length != this.molecule.length){
      return false;
    }
    return true;
  }

  // This function checks whether current molecule has all the right unique atoms.
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

  // This function checks whether the current molecule has some right unique atoms.
  this.checkSomeUnique = function(){
    if(!this.checkUniqueAtoms()){
      for(var i=0; i< this.currentMolecule.length; i++){
        for(var j=0; j < this.molecule.length; j++){
          if(this.currentMolecule[i].value == this.molecule[j].value){
            return true;
          }
        }
        return false;
      }
    }
    return false;
  }

// This function checks whether the amount of unique atoms of current molecule is right.
  this.checkAmountOfTypeOfAtoms = function(){
    for(var j=0; j< currentQuestion.molecule.length; j++){
  		if(countNumberOfAtoms(currentQuestion.molecule, currentQuestion.molecule[j].value) != countNumberOfAtoms(currentQuestion.currentMolecule, currentQuestion.molecule[j].value)){
					return false;
			}
		}
    return true;
  }

  // This function checks whether the connections of the current molecule are correct.
  this.checkConnections = function(){
    var copyMolecule = [];
    for(var i=0; i< this.currentMolecule.length; i++){
      copyMolecule.push(this.currentMolecule[i]);
    }
    this.molecule.sort(function(a, b){
        return a.value < b.value;
    });
    this.currentMolecule.sort(function(a, b){
        return a.value < b.value;
    });

    var boolean = false;
    for(var i=0; i<this.molecule.length; i++){
      var boolean = this.findCorrectMatch(this.molecule[i]);
      if(!boolean){
        this.currentMolecule = this.deleteList(this.currentMolecule);
        for(var k=0; k < copyMolecule.length; k++){
          this.currentMolecule.push(copyMolecule[k]);
        }
        return false;
      }
    }
    this.currentMolecule = this.deleteList(this.currentMolecule);
    for(var i=0; i < copyMolecule.length; i++){
      this.currentMolecule.push(copyMolecule[i]);
    }
    return boolean;
  };

  // This function deletes an element from list.
  this.deleteList = function(list){
    while(list.length > 0){
      list.pop();
    }
    return list;
  }

  // This function tries to find an atom of currentMolecule that matches the parameter and checks whether they have the same neighbours.
  this.findCorrectMatch = function(atom){
    atom.neighbour.sort(function(a, b){
        return a.value < b.value;
    });
    for(var i=0; i<this.currentMolecule.length; i++){
      if(this.currentMolecule[i].value == atom.value){
        this.currentMolecule[i].neighbour.sort(function(a, b){
            return a.value < b.value;
        });
        if(this.checkRightNeighbours(atom.neighbour, this.currentMolecule[i].neighbour)){
          this.currentMolecule.splice(i,1);
          return true;
        }
      }
    }
    return false;
  }

  // This function checks whether subset is a subset of superset.
  this.arrayContainsArray = function(superset, subset) {
    if (0 === subset.length) {
      return false;
    }
    return subset.every(function (value) {
      return (superset.indexOf(value) >= 0);
    });
  }

  // This function makes a list of all values in molecuul.
  this.makeListOfValues = function(molecuul){
    var values = [];
    for(var i=0; i < molecuul.length; i++){
      values.push(molecuul[i].value);
    }
    return values;
  }

  // This function checks whether the two parameters have the same values.
  this.checkRightNeighbours = function(atom, currentNeighbours){
    var valuesAtom = this.makeListOfValues(atom);
    var valuesCurrent = this.makeListOfValues(currentNeighbours);
    var boolean = this.arrayContainsArray(valuesCurrent, valuesAtom);
    return boolean;
  }

  // This function shows this particular question on screen.
  this.showQuestion = function(){
    var style = { font: '14px Arial', fill: "#000000", align: "center" };
    var content = "";
    if(this.repeat != -1){
      content = ["Assignment: " + "You have not succeeded in making this " + this.moleculeName + " molecule. Could you please try again?" + " " + this.helpText];
    }
    else{
      content = ["Assignment: " + this.currentQuestionText];
    }
    missionpopup.style.display = 'block';
    delayText.wordIndex = 0;
    delayText.lineIndex = 0;
    delayText.content = content;
    missionText.innerText = "";
    delayText.nextLine();
    this.setPropertiesQuestion();
  };

  // This function determines if an assignment should provide an assistant and which help is offered for this specific assignment.
  this.setPropertiesQuestion = function(){
    if(this.repeat != -1 && this.uniqueButtons && !randomStrategy){
      this.makeButtons();
      this.uniqueButtons = false;
      this.giveHints = false;
      this.hintConnections = false;
      this.helpText = [];
    }
    else if(this.repeat != -1 && currentQuestion.hintConnections && !randomStrategy){
      this.giveHints = true;
      makeButtons();
    }
    else{
      this.uniqueButtons = false;
      this.giveHints = false;
      this.hintConnections = false;
      makeButtons();
    }
  }

  // This function determines the covalences of each atom of this specific molecule.
  this.determineCovalence = function(){
    for(var i=0; i < this.molecule.length; i++){
      this.molecule[i].determineCovalence();
    }
  }

  // This function calls a function a function makeUndraggable for each atom and therefore
  // makes the molecule undraggable.
  this.makeUndraggable = function(){
    for(var i=0; i < this.currentMolecule.length; i++){
      this.currentMolecule[i].makeUndraggable();
    }
    return;
  }

  // This function determines the unique atoms of the correct answer molecule.
  this.determineUniqueAtoms = function(){
    let set = new Set();
    for(var i=0; i< this.molecule.length; i++){
      set.add(this.molecule[i].value);
    }
    return set;
  };

  // This function determines the unique atoms of the currentMolecule.
  this.determineCurrentUnique = function(){
    let set = new Set();
    for(var i=0; i< this.currentMolecule.length; i++){
      set.add(this.currentMolecule[i].value);
    }
    return set;
  };

  // This function determines the difficulty of this trial.
  this.determineDifficulty = function(){
    var numberOfAtoms = 0;
    for(var i=0; i< this.molecule.length; i++){
      numberOfAtoms = numberOfAtoms + 1;
    }
    var numberOfUniqueAtoms = this.determineUniqueAtoms().size;
    this.difficulty = +numberOfAtoms - +this.familiarity + +numberOfUniqueAtoms;
    };

  // This function removes all buttons from screen.
  this.removeButtons = function(){
    for(var i=0; i < buttonsList.length; i++){
  	   buttonsList[i].destroy();
    }
  }

  // This function calls a function that removes all buttons from screen and this function will puts the right ones on screen again.
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
