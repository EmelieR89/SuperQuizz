// Detta är en abstrakt spelarklass som
// användarens spelare samt botar kommer att utgå ifrån

class Player {
  constructor(name, score) {
    /**
     * @type {string}
     */
    this.name = name;
    this.gamesPlayed = 0;
    this.totalGuessA = 0;
    this.totalWinsA = 0;
    this.score = score;

    this.botListName = 'botList'
    this.humanPlayerListName = 'humanPlayerList'
    this.currentListName = ""
    this.getSavedScoreLocalStorage()
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

  addTotalGuess(){
    this.totalGuessA = this.totalGuessA + 1;
    this.saveToLocalStorage()

  }

  getSavedScoreLocalStorage (){
    if(this instanceof HumanPlayer){
      this.currentListName = this.humanPlayerListName
      this.findPlayerInLocalStorage(this.humanPlayerListName);
    }
    if(this instanceof EasyBot || this instanceof MediumBot || this instanceof HardBot){
      this.currentListName = this.botListName
      this.findPlayerInLocalStorage(this.botListName);
    }
  }

  findPlayerInLocalStorage(listName){
    this.createPlayerListInLS(listName);
    let playerList = JSON.parse(localStorage.getItem(listName))
    let playerFound = false;
    for (const player of playerList) {//loop over all players in LS and restores info if found.
      if(player.name == this.name){
        this.totalWinsA = player.totalWins;
        this.totalGuessA = player.totalGuess;
        playerFound = true;
      }
    }
    if(!playerFound){
      //add new player if not found in list
      playerList.push({name:this.name, totalWins: 0, totalGuess: 0});
      localStorage.setItem(listName, JSON.stringify(playerList));
    }
  }

  //creates a ny list in LS if none exists
  createPlayerListInLS(listName){
    if(localStorage.getItem(listName) == null){
      const playerArray = [];
      playerArray.push({name:this.name, totalWins: 0, totalGuess: 0});
      localStorage.setItem(listName, JSON.stringify(playerArray));
    }
  }

  //saves current totals wins and guesses in this obj to LS
  saveToLocalStorage(){
    let playerList = JSON.parse(localStorage.getItem(this.currentListName))
    for (const player of playerList) {
      if(player.name == this.name){
        player.totalWins = this.totalWinsA;
        player.totalGuess = this.totalGuessA;
      }
      localStorage.setItem(this.currentListName, JSON.stringify(playerList));
    }
  }
}
