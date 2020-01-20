// Detta är klassen som kontrollerar användarens input
// och matchar mot det vinnande värdet

class GameController {
  constructor() {
    this.randomGeneratedNumber = this.generateRandomNumber()
    this.playButton = document.querySelector('.game-play-container button')
    this.userInput = document.querySelector('.game-play-container input')
    this.gameResults = ""
    this.list = []

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
      this.setListGuessedNumber(numberGuessed)

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
    }
  }

  /**
   * Skriver ut en lista med de tal som användaren redan har gissat på 
   * @param {Number} numberInput Användarens input
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
    this.players.calculateAndReturnNewGuess(parseInt(newGuess), status)
    this.gameResults = "Go " + status + "!"
    document.getElementById("gameResponse").innerHTML = this.gameResults
  }


}