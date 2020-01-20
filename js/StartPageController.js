class StartPageController{
    constructor(){
        this.selectPageStart = new SelectPage()
        this.startGameButton = document.getElementById('gamePageButton')
        this.startGameButton.addEventListener('click', this.goToPage.bind(this))
    }

    goToPage(){
        console.log('go to game page from start page.')
        this.selectPageStart.showPage('game-setup-container')
    }
}