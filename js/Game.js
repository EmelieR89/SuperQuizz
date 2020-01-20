// Detta är klassen som kör hela spelet, som alla andra klasser utgår ifrån
class Game {
    constructor() {
        this.bu
        this.gameController = new GameController()
        this.currentPage = ""
        this.addEvents()

    }

    addEvents(){
        this.gameSetupButton = document.getElementById('startPageButton')
        this.gamePlayButton = document.getElementById('gameSetupButton')
        this.backToStartButton = document.getElementById('backToStart')
        this.gameSetupButton.addEventListener('click', this.gotoSetupPage.bind(this))
        this.gamePlayButton.addEventListener('click', this.goToGamePlayPage.bind(this))
        this.backToStartButton.addEventListener('click', this.goToStartPage.bind(this))
    }

    startGame() {
        this.showPage('start-container')
        this.gameController.addEventToPlay()

    }

    gotoSetupPage(){
        this.showPage('game-setup-container')
    }

    goToGamePlayPage(){
        this.showPage('game-play-container')
    }

    goToStartPage(){
        this.showPage('start-container')
    }

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
        this.currentPage = classStringIn
    }
}