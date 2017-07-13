// This code was written by a commenter on stackoverflow.
function DelayText(game){
  this.game = game;
  this.content = '';
  this.line = [];
  this.wordIndex = 0;
  this.lineIndex = 0;
  this.wordDelay = 150;
  this.lineDelay = 400;

  this.nextLine = function() {
    if (this.lineIndex === this.content.length){
      return;
    }
    //  Split the current line on spaces, so one word per array element
    this.line = this.content[this.lineIndex].split(' ');
    //  Reset the word index to zero (the first word in the line)
    this.wordIndex = 0;
    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
    //  Advance to the next line
    this.lineIndex++;
}

this.nextWord = function() {
    //  Add the next word onto the text string, followed by a space
    missionText.innerText = missionText.innerText.concat(' ' + this.line[this.wordIndex]);
    //  Advance the word index to the next word in the line
    this.wordIndex++;
    //  Last word?
    if (this.wordIndex === this.line.length){  //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(this.lineDelay, this.nextLine, this);
    }
}
}
