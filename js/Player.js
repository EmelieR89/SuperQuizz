// Detta är en abstrakt spelarklass som
// användarens spelare samt botar kommer att utgå ifrån

class Player {
  constructor(name) {
    /**
     * @type {string}
     */
    this.name = name;
    this.gamesPlayed = 0;
    this.totalWins = 0 // || localstorage
    this.totalGuess = 0 // || localstorage
    // this.score = 0 // localstorage
  }

  getStatistics(){   
    // this.score = Math.round(((4 * Math.log(this.wins)) / 1.6 ) + ((this.wins) - (this.bot1amount * 0.3) - (this.bot2amount * 0.2) - (this.bot3amount * 0.1) / (this.amountguesses) * 100)
    // const score = ((4 * Math.log(this.totalWins) / 1.6) + (this.totalWins - 1 * .2)) / this.totalGuess
    this.score =  (100*this.totalWins) + (100/ (this.totalGuess*.09))
    return this.score
  }

  addToGuess() {
    this.totalGuess++
  }

  addToWins() {
    this.totalWins++
  }

  /**
   * Sets the total games played
   * @param {number} inNumber
   */
  setGamesPlayed(inNumber) {
    this.gamesPlayed = inNumber;
  }

  /**
   * Gets the total games played
   */
  getGamesPlayed() {
    return this.gamesPlayed;
  }
}
