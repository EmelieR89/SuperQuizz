//code for start page
class StartPageController{
    constructor(game, playerManager){
        this.game = game
        this.playerManager = playerManager
        this.rulesT = document.getElementById('readRulesButton')
        this.rulesT.addEventListener('click', this.rulesToggle.bind(this))
        this.highScoreT = document.getElementById('highScoreButton')
        this.highScoreT.addEventListener('click', this.highScoreToggle.bind(this))
        this.startGameButton = document.querySelector('.start-container .start-game')
        this.userNameInput = document.querySelector('.start-container input')
        this.loginCreateButton = document.getElementById('login-create')
        //add events
        this.loginCreateButton.addEventListener('click', this.loginCreateEvent.bind(this))
        // document.getElementById('showHighScore').style.display = 'none'
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

   /**
    * toggles rules button. gets element by id and adds a eventlistener in cunstructor this.rulesT 
    */
    rulesToggle(){
        let rules = document.getElementById('showRules')
        let highScore = document.getElementById('showHighScore')
        console.log(rules.style.display)
        if (rules.style.display == 'block' || highScore.style.display == 'block') {
            rules.style.display = 'none'  
            highScore.style.display = 'none'
        } else{
            rules.style.display = 'block' || highScore.style.display == 'block'
        } 
    }
    /**
     * toggles highscore button. gets element by id and adds a eventlistener in cunstructor this.highScoreT
     */
    
    highScoreToggle(){
        let rules = document.getElementById('showRules')
        let highScore = document.getElementById('showHighScore')
        this.updateHighScoreList()
        console.log(highScore.style.display)
        if (highScore.style.display == 'block' || rules.style.display == 'block') {
            highScore.style.display = 'none'
            rules.style.display = 'none'  
        } else{
            highScore.style.display = 'block' || rules.style.display == 'block'
        }
      
    }

    /**
     * Runs when hihScoreToggle() is clicked, divs are added for name and score.
     * Css styling in start-container.css .playerHolder or .nameHolder, scoreHolder.
     */
    updateHighScoreList(){
        let highScoreOLel = document.querySelector('.high-score-list')
        //console.log(highScoreOLel.innerHTML)
        this.game.runHighScoreSort() // runs sort before list is gotten.
        let playerList = this.playerManager.getAllPlayerList()
        highScoreOLel.innerHTML = ""
        
        for (const player of playerList) {
            let liEl = document.createElement('li')
            liEl.classList.add('highScoreLi')
            
            let liDivEl = document.createElement('div')
            liDivEl.classList.add('playerHolder')
            
            let nameDivEl = document.createElement('div')
            nameDivEl.classList.add('nameHolder')
            
            let scoreDivEl = document.createElement('div')
            scoreDivEl.classList.add('scoreHolder')


            let nameTextNode = document.createTextNode(player.name)
            let scoreTextNode = document.createTextNode(player.score)

            nameDivEl.appendChild(nameTextNode)
            scoreDivEl.appendChild(scoreTextNode)

            liDivEl.appendChild(nameDivEl)
            liDivEl.appendChild(scoreDivEl)

            liEl.appendChild(liDivEl)

            highScoreOLel.appendChild(liEl)
            //console.log(highScoreOLel.innerHTML)
        }
    }
}
