// HardBot
// Logic = optimal
// Not yet fully functioning as it doesn't actually play, just logs...
// GameController needs more work before implementation is ready

class HardBot extends Player {
  // import activeBots;
  constructor(name, score) {
    super(name, score);
    this.previousGuesses = [0, 100];
    this.optimalValue = (this.previousGuesses[0] + this.previousGuesses[1]) / 2;
    this.totalWins = 0; // || localstorage
    this.totalGuess = 0; // || localstorage
  }

  getStatistics(playerAmount) {
    this.score =
      ((4 * Math.log(this.totalWins)) / 1.6 +
        (this.totalWins - playerAmount * 0.2)) /
      this.totalGuess;
    return this.score;
  }

  addToGuess() {
    this.totalGuess++;
  }

  addToWins() {
    this.totalWins++;
  }

  /**
   * The logic for storing the closest guesses to the winning value
   * @param {Number} guess The last made guess
   * @param {String} status The result of the last made guess
   */
  findPlausibleValues(guess, status) {
    this.previousGuesses.push(guess);
    this.previousGuesses.sort(function(a, b) {
      return a - b;
    });
    if (this.previousGuesses.length > 2) {
      if (status == "Higher") {
        this.previousGuesses.splice(0, 1);
      } else if (status == "Lower") {
        this.previousGuesses.splice(2, 1);
      }
    }
  }

  /**
   * This returns the optimal value
   */
  activate() {
    console.log(`${this.name} returns ${this.optimalValue}`);
    return this.optimalValue;
  }

  /**
   * This bots logic for making a new guess
   * @param {Number} guess The last made guess
   * @param {String} status The result of the last made guess
   */
  calculateNewOptimalGuess(guess, status) {
    this.findPlausibleValues(guess, status);

    const guessArray = this.previousGuesses;
       this.optimalValue = Math.floor((guessArray[0] + guessArray[1]) / 2);
  }
}
