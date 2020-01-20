class GameSetupController{
    constructor(){
        this.selectPage = new SelectPage()
        this.backToStartButton = document.getElementById('backToStart')
        this.backToStartButton.addEventListener('click', this.goToPage.bind(this))
    }

    goToPage(){
        console.log('go to start page.')
        this.selectPage.showPage('start-container')
    }

}