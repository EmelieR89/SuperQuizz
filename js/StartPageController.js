//code for start page
class StartPageController{
    constructor(game){
        this.game = game
        this.rulesT = document.getElementById('readRulesButton')
        this.rulesT.addEventListener('click', this.rulesToggle.bind(this))
        this.highScoreButton = document.getElementById('highScoreButton')
        this.highScoreButton.addEventListener('click', this.highScoreToggle.bind(this))
        this.startGameButton = document.querySelector('.start-container .start-game')
        this.userNameInput = document.querySelector('.start-container input')
    }

    addStartGameEvent() {
        this.startGameButton.addEventListener('click',() => {
            if (this.userNameInput.value === "") {
                this.generateEmptyUserNameMessage()
            }
            else {
                this.proceedToStartGame()
            }
        })
    }

    // addEnterpress() {
    //     this.startGameButton.addEventListener('keydown',(event) => {
    //         const enter = event.key === 'Enter'
    //         if (enter === true) {
               
    //             this.proceedToStartGame()
    //             return
    //         }
    //     })
    // }

    addUserNameInputEvent() {
        this.userNameInput.addEventListener('keyup', ()=> {
            let disabled;
            if (this.userNameInput.value != "") {
                disabled = true
                this.manageStartButtonColor(disabled)
            }
            else {
                disabled = false
                this.manageStartButtonColor(disabled)                
            }
        })
    }

    manageStartButtonColor(disabled) {
        if (disabled && this.startGameButton.classList.contains('inactive-start')) {
            this.startGameButton.classList.remove('inactive-start')
            this.startGameButton.classList.add('active-start')
        }
        else if (!disabled) {
            this.startGameButton.classList.remove('active-start')
            this.startGameButton.classList.add('inactive-start')
        }
        else {
             console.log('do nothing');
            // this.startGameButton.addEventListener('keydown',(event) => {
            //     if (event.key === 'Enter') {
            //         this.proceedToStartGame()
            //     } 
        }
    }
    
    generateEmptyUserNameMessage() {
        console.log('pls choose name');
    }
    
    proceedToStartGame() {
        this.game.gotoSetupPage()             
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
