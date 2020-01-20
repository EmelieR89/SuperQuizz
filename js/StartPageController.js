class StartPageController{
    constructor(){
       // this.selectPageStart = new SelectPage()
       // this.startGameButton = document.getElementById('gamePageButton')
       // this.startGameButton.addEventListener('click', this.goToPage.bind(this))
        
        this.rulesT = document.getElementById('readRulesButton')
        this.rulesT.addEventListener('click', this.rulesToggle.bind(this))
    }

    goToPage(){
        this.selectPageStart.showPage('game-setup-container')
    }
    
    rulesToggle(){
        let rules = document.getElementById('showRules')
        if (rules.style.display === 'none') {
            rules.style.display = 'block'
        } else{
            rules.style.display = 'none'
        }
       
    }
}
