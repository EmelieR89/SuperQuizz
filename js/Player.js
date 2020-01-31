// Detta är en abstrakt spelarklass som
// användarens spelare samt botar kommer att utgå ifrån

class Player {
  constructor(name) {
    /**
     * @type {string}
     */
    this.name = name;
    this.totalGuessA = 0;
    this.totalWinsA = 0;
    this.score = 0;

    this.botListName = 'botList'
    this.humanPlayerListName = 'humanPlayerList'
    this.currentListName = ""
    this.getSavedScoreLocalStorage()
  }

  calculateScore() {
    this.score = 100 + (((this.totalWinsA)*100) / ((10 + this.totalGuessA)*.6))
    return this.score
  }

  addTotalGuess(){
    this.totalGuessA = this.totalGuessA + 1;
    //update score
    this.calculateScore()
    this.saveToLocalStorage()

  }

  addTotalWins(){
    this.totalWinsA++
    this.calculateScore()
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
        this.score = player.score;
        this.totalWinsA = player.totalWins;
        this.totalGuessA = player.totalGuess;
        playerFound = true;
      }
    }
    if(!playerFound){
      //add new player if not found in list
      playerList.push({name:this.name, totalWins: 0, totalGuess: 0, score: 0});
      localStorage.setItem(listName, JSON.stringify(playerList));
    }
  }

  //creates a ny list in LS if none exists
  createPlayerListInLS(listName){
    if(localStorage.getItem(listName) == null){
      const playerArray = [];
      playerArray.push({name:this.name, totalWins: 0, totalGuess: 0, score: 0
      });
      localStorage.setItem(listName, JSON.stringify(playerArray));
    }
  }

  //saves current totals wins and guesses in this obj to LS
  saveToLocalStorage(){
    let playerList = JSON.parse(localStorage.getItem(this.currentListName))
    for (const player of playerList) {
      if(player.name == this.name){
        player.score = this.score
        player.totalWins = this.totalWinsA;
        player.totalGuess = this.totalGuessA;
      }
      localStorage.setItem(this.currentListName, JSON.stringify(playerList));
    }
  }
}
