//code for start page
class StartPageController{
    constructor(game, playerManager){
        this.game = game
        this.playerManager = playerManager
        this.rulesT = document.getElementById('readRulesButton')
        this.rulesT.addEventListener('click', this.rulesToggle.bind(this))
        this.highScoreButton = document.getElementById('highScoreButton')
        this.highScoreButton.addEventListener('click', this.highScoreToggle.bind(this))
        this.startGameButton = document.querySelector('.start-container .start-game')
        this.userNameInput = document.querySelector('.start-container input')
        this.loginCreateButton = document.getElementById('login-create')
        //add events
        this.loginCreateButton.addEventListener('click', this.loginCreateEvent.bind(this))
    }

    addStartGameEvent() {
        this.startGameButton.addEventListener('click', () => {
            if (this.userNameInput.value === "") {
                this.generateEmptyUserNameMessage()
            }
            else {
                this.proceedToStartGame()
            }
        })
    }

    addUserNameInputEvent() {
        this.userNameInput.addEventListener('keyup', () => {
            let disabled;
            if (this.userNameInput.value != "") {
                disabled = true
                
                //change login/create button text if player is found or not.
                if(!this.playerManager.findPlayer(this.userNameInput.value)){
                    this.loginCreateButton.innerHTML = 'New User'
                }else{
                    this.loginCreateButton.innerHTML = 'Login'
                }//end login code.

                this.manageStartButtonColor(disabled)
                if (event.key === 'Enter') {
                    this.proceedToStartGame()
                } 
            }
            else {
                disabled = false
                this.manageStartButtonColor(disabled) 
                this.loginCreateButton.innerHTML = 'Login/Create'               
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
    }

    //run when login button is clicked
    loginCreateEvent(){
        if(!this.playerManager.findPlayer(this.userNameInput.value)){
            this.playerManager.createPlayer(this.userNameInput.value)
            this.playerManager.setCurrentHumanPlayer(this.playerManager.findPlayer(this.userNameInput.value))
            //console.log(this.playerManager.findPlayer(this.userNameInput.value))
        }
        else{
            this.playerManager.setCurrentHumanPlayer(this.playerManager.findPlayer(this.userNameInput.value))
        }

        this.loginCreateButton.innerHTML = this.playerManager.getCurrentHumanPlayer().name

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
