// Detta är klassen som kontrollerar användarens input
// och matchar mot det vinnande värdet

class GameController {
  constructor(game) {
    this.game = game
    this.randomGeneratedNumber = this.generateRandomNumber()
    this.playButton = document.querySelector('.game-play-container button')
    this.userInput = document.querySelector('.game-play-container input')
    this.activePlayerTitle = document.querySelector('.player-turn')
    this.winnerTitle = document.querySelector('.game-winner-container h1')
    this.gameResults = ""
    this.list = []
    this.turn = 0
    this.gameOver = false
  }
  
  setupInitialGameState() {
    this.updateActivePlayer()
  }
  
  updateActivePlayer() {
    this.activePlayer = this.playerTurns[this.turn]
    this.updatePlayerTurnTitle()
    this.checkIfBotTurn()
  }

  checkIfBotTurn() {
    if (this.activePlayer instanceof BotPlayer) {
      this.activePlayer.addToGuess()
      const numberGuessed = this.activePlayer.activate()
      this.checkPlayerInput(numberGuessed)
      this.setListGuessedNumber(numberGuessed)
      if (!this.gameOver) {
        this.cyclePlayerTurns()
      }
    }
  }

  /**
   * Creates an array of players based of the number inputed in Game Setup
   * @param {Number} nOfPlayers Number of AI players inputed
   */
  createPlayerTurns(nOfPlayers) {
    this.nOfPlayers = nOfPlayers
    let playerArray = []
    let humanPlayerTurn = parseInt(Math.random() * (nOfPlayers+1))
    
    for (let i = 0; i < nOfPlayers+1; i++){
      if (i === humanPlayerTurn) {
        playerArray.push(new HumanPlayer('hooman'))
      }
      else {
        playerArray.push(new BotPlayer(i))
      }
    }    
    this.playerTurns = playerArray
  } 
  
  /**
   * Updates the title based on turn
   */
  updatePlayerTurnTitle() {
    this.activePlayerTitle.innerHTML = this.activePlayer.name
  }

  /**
   * Returns a random number between 1 and 100
   */
  generateRandomNumber() {
    return 50
    // return parseInt(Math.random() * 100);
  }

  /**
   * Adds an eventlistener to the input button
   */
  addEventToPlay() {
    this.playButton.addEventListener('click', () => {
      const numberGuessed = parseInt(this.userInput.value)
      this.checkPlayerInput(numberGuessed)
      this.setListGuessedNumber(numberGuessed)
      this.cyclePlayerTurns()
    })
  }

  cyclePlayerTurns() {
    this.turn++
    if (this.turn > this.playerTurns.length-1) {
      this.turn = 0
    }
    if (!this.gameOver) {
      this.updateActivePlayer()
    }
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
    } else if (input == this.randomGeneratedNumber) {
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
   * Skriver ut en lista med de tal som användaren redan har gissat på 
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
   * Skriver ut resultatet i DOMen
   * @param {String} status Resultatet av checkUserInput
   */
  updateGameResponse(newGuess, status) {
    this.playerTurns.forEach(player => {
      if (player instanceof BotPlayer) {
        player.calculateAndReturnNewGuess(newGuess, status)
      }
    });
    this.gameResults = "Go " + status + "!"
    document.getElementById("gameResponse").innerHTML = this.gameResults
  }


}