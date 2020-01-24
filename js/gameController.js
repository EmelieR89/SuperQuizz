// Detta är klassen som kontrollerar användarens input
// och matchar mot det vinnande värdet

class GameController {
  constructor(game) {
    this.game = game
    this.randomGeneratedNumber = this.generateRandomNumber()
    this.playButton = document.querySelector('.game-play-container button')
    this.userInput = document.querySelector('.game-play-container input')
    this.activePlayerTitle = document.querySelector('.player-turn')
    this.winnerPlayerTitle = document.querySelector('.game-winner-container h2')
    this.winnerNumberTitle = document.querySelector('.win-con')
    this.gameResults = ""
    this.list = []
    this.turn = 0
    this.gameOver = false
  }
/**
 * Makes enter key work in game-play-container. But the game stops after the first round.
 */
//   addEventToInput() {
//     this.userInput.addEventListener('keyup', (event) => {
//         if(event.key === 'Enter') {
//             if(this.userInput.value === ''){
//             }
//             else {
//                 let numberGuessed = this.userInput.value
//                 this.checkPlayerInput(numberGuessed)
//                 this.setListGuessedNumber(numberGuessed)
//                 this.userInput.value = ""
//             }
//             console.log(this.userInput.length)
//         }
//     })
//   }

  /**
   * Sets up the turn-based logic, meant for everything necessary when starting up a game
   */
  setupInitialGameState() {

    this.cyclePlayerTurns()
  }
  
  /**
   * Logic for cycling player turns
   */
  cyclePlayerTurns() {
    if (this.turn > this.playerTurns.length - 1) {
      this.turn = 0
    }
    if (!this.gameOver) {
      this.updateActivePlayer()
      this.updatePlayerTurnVisuals()
      this.checkIfBotTurn()
      this.turn++
    }
  }

  /**
   * Updates the active player based from turn and checks if that player is a bot
   */
  updateActivePlayer() {
    this.activePlayer = this.playerTurns[this.turn]
  }
  
  /**
   * Checks if active player is a bot and retrieves answer if it is
   */
  checkIfBotTurn() {
    if (this.activePlayer instanceof BotPlayer) {
      const activeBot = this.activePlayer
      this.retrieveAnswerFromBot(activeBot)
    }
  }
  
  /**
   * Updates the title based on turn
   */
  updatePlayerTurnVisuals() {
    this.activePlayerTitle.innerHTML = this.activePlayer.name
    if (this.activePlayer instanceof BotPlayer) {
      console.log(`${this.activePlayer.name} painting bot stuff`);
      this.userInput.disabled = true
      this.userInput.style.opacity = .4
      this.playButton.disabled = true
      this.playButton.classList.add('bot-active')
      this.playButton.classList.remove('human-active')
    }
    else {
      console.log(`${this.activePlayer.name} painting human stuff`);
      this.userInput.disabled = false;
      this.userInput.style.opacity = 1
      this.playButton.disabled = false;
      this.userInput.focus()
      this.playButton.classList.remove('bot-active')
      this.playButton.classList.add('human-active')
    }
  }

  /**
   * Retrieves the answer from the active BotPlayer with a delay
   * @param {BotPlayer} activeBot The active BotPlayer
   */
  retrieveAnswerFromBot(activeBot) {
    const numberGuessed = activeBot.activate()
    const generateRandomDelay = parseInt((Math.random() * 4000) + 500)
    setTimeout(() => {
      this.checkPlayerInput(numberGuessed)
      this.setListGuessedNumber(numberGuessed)
      if (!this.gameOver) {
        this.cyclePlayerTurns()
      }
    }, generateRandomDelay)
  }

  /**
   * Creates an array of players based of the number inputed in Game Setup
   * @param {Number} nOfPlayers Number of AI players inputed
   */
  createPlayerTurns(nOfPlayers) {
    this.nOfPlayers = nOfPlayers
    let playerArray = []
    let humanPlayerTurn = parseInt(Math.random() * (nOfPlayers.length + 1))
    console.log(humanPlayerTurn);


    for (let i = 0; i < nOfPlayers.length + 1; i++) {
      if (i === humanPlayerTurn) {
        playerArray.push(new HumanPlayer('hooman'))
      }
      else {
        playerArray.push(new BotPlayer(`Bot ${i}`))
      }
    }
    this.playerTurns = playerArray
  }

  /**
   * Returns a random number between 1 and 100
   */
  generateRandomNumber() {
    //return 75 för buggfix
    return parseInt(Math.random() * 100);

  }

  /**
   * Adds an eventlistener to the input button
   */
  addEventToPlay() {
    this.playButton.addEventListener('click', () => {
      const numberGuessed = parseInt(this.userInput.value)
      this.checkPlayerInput(numberGuessed)
      this.setListGuessedNumber(numberGuessed)
      this.userInput.value = ""
      if (!this.gameOver)
        this.cyclePlayerTurns()
    })
  }

  /**
   * Checks the user input with the winning number
   * @param {Number} input User input
   */
  checkPlayerInput(input) {
    if (input < this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Higher")
    } else if (input > this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Lower")
    } else if (input === this.randomGeneratedNumber) {
      this.gameOver = true
      if (this.activePlayer instanceof BotPlayer) {
        this.activePlayer.addToWins()
        const stats = this.activePlayer.getStatistics(this.nOfPlayers)
        console.log(stats, this.activePlayer.totalWins, this.activePlayer.totalGuess);
      }
      this.winnerTitle.innerHTML = `${this.activePlayer.name} is the winner!`
      
      this.game.showPage('game-winner-container')
    }
  }

  /**
   * Shows game state to over and presents the winner
   */
  goToWinnerPage() {
    this.updateWinnerPlayerTitle()
    this.updateWinnerNumberTitle()
    this.game.showPage('game-winner-container')
  }

  /**
   * Updates the winning player title
   */
  updateWinnerPlayerTitle() {
    this.winnerPlayerTitle.innerHTML = `${this.activePlayer.name}`
  }

  /**
   * Updates the winning number
   */
  updateWinnerNumberTitle() {
    this.winnerNumberTitle.innerHTML = `${this.randomGeneratedNumber}`
  }

  /**
   * Prints a list of the guessed numbers and stores them in Local storage
   * @param {Number} numberInput User input
   */
  setListGuessedNumber(numberInput) {
    this.list.push(numberInput)
    localStorage.setItem('guessedNumber', JSON.stringify(this.list))
    let userGuesses = JSON.parse(localStorage.getItem('guessedNumber'))
    let ul = document.getElementById("guessedNumbersFromPlayer")
    ul.innerHTML = ""
    for (let guess of userGuesses) {
      let li = document.createElement("li")
      li.innerHTML = guess
      ul.appendChild(li)
    }

    ul.className = "guessedNumbersShown"
  }

  /**
   * Prints the game controller's answer to a players input
   * @param {number} newGuess The player's guess
   * @param {String} status The result of the input
   */
  updateGameResponse(newGuess, status) {
    this.playerTurns.forEach(player => {
      if (player instanceof BotPlayer) {
        player.calculateNewOptimalGuess(newGuess, status)
      }
    });
    this.gameResults = "Go " + status + "!"
    document.getElementById("gameResponse").innerHTML = this.gameResults
  }

  /**
   * Clears item in localStorage and the list with guessed numbers
   */
  resetGuessedList() {
    localStorage.removeItem('guessedNumber')
    this.list = []
    let ul = document.getElementById("guessedNumbersFromPlayer")
    ul.innerHTML = ""
  }

}
