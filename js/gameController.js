  // Detta är klassen som kontrollerar användarens input 
  // och matchar mot det vinnande värdet

class GameController {
  constructor(game) {
    this.game = game
    this.randomGeneratedNumber = this.generateRandomNumber()
    this.playButton = document.querySelector('.game-play-container button')
    this.userInput = document.querySelector('.game-play-container input')
    this.gameResults = ""
    this.players = new BotPlayer()
  }

  /**
   * Genererar ett random nummer mellan 1 och 100
   */
  generateRandomNumber() {
    return parseInt(Math.random() * 100);
  }

  /**
   * Lägger till en eventlyssnare på playknappen
   */
  addEventToPlay() {
    this.playButton.addEventListener('click', () => {
      const numberGuessed = this.userInput.value     
      this.checkUserInput(numberGuessed)
    })
  }

  /**
   * Kontrollerar användarens input mot det random-genererade, vinnande värdet
   * @param {Number} input Användarens input
   */
  checkUserInput(input) {
    if (input < this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Higher")
    } else if (input > this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Lower")
    } else if (input == this.randomGeneratedNumber) {
      document.getElementById("gameResponse").innerHTML = "WINNER!"
      this.game.showPage('game-winner-container')
    }
  }

  /**
   * Skriver ut resultatet i DOMen
   * @param {Number} newGuess Användarens input
   * @param {String} status Resultatet av checkUserInput
   */
  updateGameResponse(newGuess, status) {
    this.players.calculateAndReturnNewGuess(parseInt(newGuess), status)
    this.gameResults += newGuess + ", you have to go " + status + "\n"
    document.getElementById("gameResponse").innerHTML = this.gameResults
  }
}
