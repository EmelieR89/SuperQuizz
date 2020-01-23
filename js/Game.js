// Detta är klassen som kör hela spelet, som alla andra klasser utgår ifrån
class Game {
    constructor() {
        this.playerManager = new PlayerManager()
        this.startPageController = new StartPageController(this, this.playerManager)
        this.gameSetupController = new GameSetupController()
        this.gameController = new GameController(this)
        this.currentPageState = ""

        //Add Events
        // this.gameSetupButton = document.getElementById('startPageButton')
        // if(this.gameSetupButton !== null){//if button is removed, dont add eventlistener.
        //     this.gameSetupButton.addEventListener('click', this.gotoSetupPage.bind(this))
        // }
        this.gamePlayButton = document.getElementById('gameSetupButton')
        if (this.gamePlayButton !== null) {
            this.gamePlayButton.addEventListener('click', this.goToGamePlayPage.bind(this))
        }
        this.playAgainButton = document.getElementById('playAgain')
        if (this.playAgainButton !== null) {
            this.playAgainButton.addEventListener('click', this.goToGamePlayPage.bind(this))
        }

        //Add events for all back to start buttons.
        this.startPageButtonList = document.querySelectorAll('#backToStart')
        if (this.startPageButtonList !== null) {
            for (const startPageButtonEl of this.startPageButtonList) {
                startPageButtonEl.addEventListener('click', this.goToStartPage.bind(this))
            }
        }

    }

    startGame() {
        this.showPage('start-container')
        this.startPageController.addStartGameEvent()
        this.startPageController.addUserNameInputEvent()
        this.gameController.addEventToPlay()
    }

    //runs after showPage changes pages, 
    updateState() {
        if (this.currentPageState === 'game-winner-container') {
            console.log("run winner code " + this.gameController.gameResults)
            //this.startPageController.getHumanPlayerName() + " player name and AI player number " + 
            //this.gameSetupController.getNumberOfAIPlayers())
        }
    }

    getCurrentGameState() {
        return this.currentPageState
    }

    //Start click functions.
    gotoSetupPage() {
        this.showPage('game-setup-container')

        //test save new player info to local storage.
        if(this.playerManager.currentHumanPlayer != null){
            this.playerManager.currentHumanPlayer.gamesPlayed ++
            console.log(this.playerManager.currentHumanPlayer.gamesPlayed)
            this.playerManager.saveAllPlayerList()
        }
    }

    goToGamePlayPage() {
        this.gameController.createPlayerTurns(this.gameSetupController.getNumberOfAIPlayers())
        this.gameController.setupInitialGameState()
        this.gameController.resetGuessedList()
        document.getElementById("gameResponse").innerHTML = ""
        this.showPage('game-play-container')
    }

    goToStartPage() {
        this.showPage('start-container')
    }

    goToHighScore() {
        this.showPage('high-score-container')
    }
    //End click functions.

    //Change pages by css Display: none in 'hiddenPages' style.css.
    showPage(classStringIn) {
        let pageHolderList = document.body.querySelectorAll('.pageHolder')
        for (let pageEl of pageHolderList) {
            if (!pageEl.classList.contains(classStringIn)) {
                pageEl.classList.add('hiddenPage')
            }
            else {
                pageEl.classList.remove('hiddenPage')
            }
        }
        this.currentPageState = classStringIn
        this.updateState()
    }
}