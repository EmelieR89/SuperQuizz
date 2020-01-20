// Detta är klassen som kör hela spelet, som alla andra klasser utgår ifrån
class Game {
    constructor() {
        this.startPageController = new StartPageController()
        this.gameSetupController = new GameSetupController()
        this.gameController = new GameController(this)
        this.currentPageState = ""
        this.addEvents()

    }
    //Start events.
    addEvents(){
        this.gameSetupButton = document.getElementById('startPageButton')
        this.gameSetupButton.addEventListener('click', this.gotoSetupPage.bind(this))
        this.gamePlayButton = document.getElementById('gameSetupButton')
        this.gamePlayButton.addEventListener('click', this.goToGamePlayPage.bind(this))
        this.highScoreButton = document.getElementById('highScoreButton')
        this.highScoreButton.addEventListener('click', this.goToHighScore.bind(this))
        this.rulesButton = document.getElementById('rulesButton')
        this.rulesButton.addEventListener('click', this.gotoRulesPage.bind(this))
        this.playAgainButton = document.getElementById('playAgain')
        this.playAgainButton.addEventListener('click', this.goToGamePlayPage.bind(this))
        this.addEventToAllStartPageButtons()
    }

    addEventToAllStartPageButtons(){
        let startPageButtonList = document.querySelectorAll('#backToStart')
        for (const startPageButtonEl of startPageButtonList) {
            startPageButtonEl.addEventListener('click', this.goToStartPage.bind(this))
        }
    }
    //End events.

    startGame() {
        this.showPage('start-container')
        this.gameController.addEventToPlay()
    }

    updateState(){
        if(this.currentPageState === 'game-winner-container'){
            console.log("run winner code " + this.gameController.gameResults + 
            this.startPageController.getHumanPlayerName() + " player name and AI player number " + 
            this.gameSetupController.getNumberOfAIPlayers())
        }
    }
    
    //Start click functions.
    gotoSetupPage(){
        this.showPage('game-setup-container')
    }

    goToGamePlayPage(){
        this.showPage('game-play-container')
    }

    goToStartPage(){
        this.showPage('start-container')
    }

    gotoRulesPage(){
        this.showPage('rules-container')
    }

    goToHighScore(){
        this.showPage('high-score-container')
    }
    //End click functions.

    //Change pages by css Display: none in 'hiddenPages' style.css.
    showPage(classStringIn){
        let pageHolderList = document.body.querySelectorAll('.pageHolder')
        for(let pageEl of pageHolderList){
            if(!pageEl.classList.contains(classStringIn)){
                pageEl.classList.add('hiddenPage')
            }
            else{
                pageEl.classList.remove('hiddenPage')
            }
        }
        this.currentPageState = classStringIn
        this.updateState()
    }
}