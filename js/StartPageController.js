//code for start page
class StartPageController{
    constructor(game){
        this.game = game
        this.rulesT = document.getElementById('readRulesButton')
        this.rulesT.addEventListener('click', this.rulesToggle.bind(this))
        this.highScoreButton = document.getElementById('highScoreButton')
        this.highScoreButton.addEventListener('click', this.highScoreToggle.bind(this))
    }


    rulesToggle(){
        let rules = document.getElementById('showRules')
        console.log(rules.style.display)
        if (rules.style.display === 'none') {
            rules.style.display = 'block'
        } else{
            rules.style.display = 'none'
        }
       
    }

    highScoreToggle(){
        this.game.showPage('start-container')
     
        if (this.game.getCurrentGameState() === 'start-container') {
            this.game.showPage('high-score-container')
        } else{
            this.game.showPage('start-container')
        }
        const highscoreElem = document.querySelector("#highscore-list")
    }
}
