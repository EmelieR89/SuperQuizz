// Detta är en abstrakt spelarklass som
// användarens spelare samt botar kommer att utgå ifrån

class Player {
  constructor(name, score) {
    /**
     * @type {string}
     */
    this.name = name;
    this.gamesPlayed = 0;
    this.score = score;
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
