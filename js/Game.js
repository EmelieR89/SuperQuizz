// Detta är klassen som kör hela spelet, som alla andra klasser utgår ifrån
class Game {
  constructor() {
    this.playerManager = new PlayerManager();
    this.startPageController = new StartPageController(
      this,
      this.playerManager
    );
    this.gameSetupController = new GameSetupController();
    this.currentPageState = "";
    this.highScore = new HighScore(this.playerManager);
    this.currentPlayerName = "Anon"

    this.gameSetupButton = document.getElementById("startPageButton");
    if (this.gameSetupButton !== null) {
      //if button is removed, dont add eventlistener.
      this.gameSetupButton.addEventListener(
        "click",
        this.gotoSetupPage.bind(this)
      );
    }
    this.gamePlayButton = document.getElementById("gameSetupButton");
    if (this.gamePlayButton !== null) {
      this.gamePlayButton.addEventListener(
        "click",
        this.goToGamePlayPage.bind(this)
      );
    }
    this.playAgainButton = document.getElementById("playAgain");
    if (this.playAgainButton !== null) {
      this.playAgainButton.addEventListener(
        "click",
        this.goToGamePlayPage.bind(this)
      );
    }
    this.gameResultsButton = document.getElementById("goToResult");
    if (this.gameResultsButton !== null) {
      this.gameResultsButton.addEventListener(
        "click",
        this.goToResults.bind(this)
      );
    }

    //Add events for all back to start buttons.
    this.startPageButtonList = document.querySelectorAll("#backToStart");
    if (this.startPageButtonList !== null) {
      for (const startPageButtonEl of this.startPageButtonList) {
        startPageButtonEl.addEventListener(
          "click",
          this.goToStartPage.bind(this)
        );
      }
    }
  }

  startGame() {
    this.showPage("start-container");
    this.startPageController.addStartGameEvent();
    this.startPageController.addUserNameInputEvent();
  }

  //runs after showPage changes pages,
  updateState() {
    if (this.currentPageState === "game-winner-container") {
      console.log("run winner code " + this.gameController.gameResults);
    }
    if (this.currentPageState === "game-play-container") {
      this.gameController.userInput.focus();
    }
  }

  getCurrentGameState() {
    return this.currentPageState;
  }

  //Start click functions.
  gotoSetupPage() {
    this.showPage("game-setup-container");

    //test save new player info to local storage.
    // if (this.playerManager.currentHumanPlayer != null) {
    //   this.playerManager.currentHumanPlayer.gamesPlayed++;
    //   console.log(this.playerManager.currentHumanPlayer.gamesPlayed);
    //   this.playerManager.saveAllPlayerAndBotsList();
    //   this.playerManager.addPlayerToList(new BotPlayer("addBot", 8));
    //   this.playerManager.addBotToList(new BotPlayer("addBotList", 3));
    //   //this.playerManager.saveAllPlayerList()
    //   console.log(this.playerManager.getAllPlayerList());
    //   console.log(this.playerManager.getAllBotsList());
    //   //this.playerManager.getAllBotPlayers()
    // }
  }

  goToGamePlayPage() {
    document.getElementById("guessedNumbersFromPlayer").innerHTML = "";
    document.getElementById("gameResponse").innerHTML = "";


    delete this.gameController
    this.gameController = new GameController(this)
    this.gameController.createPlayInputs();
    this.gameController.addEventToPlay();
    this.gameController.addEventToInput();

    this.gameController.createPlayerTurns(
      this.gameSetupController.getNumberOfAIPlayers()
    );
    this.gameController.cyclePlayerTurns();
    this.showPage("game-play-container");
  }

  goToStartPage() {
    this.startPageController.updateHighScoreList()
    this.showPage("start-container");
  }

  goToHighScore() {
    this.showPage("high-score-container");
  }
  goToResults() {
    this.showScore()
    this.showPage("game-result-container");
  }
  //End click functions.

  showScore(){
    const player = this.gameController.returnHumanPlayer()
    const score = player.calculateScore()
    const scoreElement = document.querySelector('.gamescore');
    scoreElement.innerHTML = parseFloat(score).toFixed(1)
    
    // const totalGuesses = this.gameController.returnHumanPlayer()
    const guessElement = document.querySelector('.totalguess');
    guessElement.innerHTML = player.totalGuessA
  }

  //Change pages by css Display: none in 'hiddenPages' style.css.
  showPage(classStringIn) {
    let pageHolderList = document.body.querySelectorAll(".pageHolder");
    for (let pageEl of pageHolderList) {
      if (!pageEl.classList.contains(classStringIn)) {
        pageEl.classList.add("hiddenPage");
      } else {
        pageEl.classList.remove("hiddenPage");
      }
    }
    this.currentPageState = classStringIn;
    this.updateState();
  }

  /**
   * Runs session sort in HighScore class.
   * TODO add sort to bots list also. 
   */
  runHighScoreSort() {
    this.highScore.sessionSort()
  }
}
