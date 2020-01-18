  // Detta är klassen som kontrollerar användarens input 
  // och matchar mot det vinnande värdet

class GameController {
  constructor() {
    this.randomGeneratedNumber = this.generateRandomNumber()
    this.playButton = document.querySelector('.game-play-container button')
    this.userInput = document.querySelector('.game-play-container input')
    this.gameResults = ""
  }

  generateRandomNumber() {
    return parseInt(Math.random() * 100);
  }

  addEventToPlay() {
    // console.log(this.playButton, this.userInput, this.randomGeneratedNumber);  
    this.playButton.addEventListener('click', () => {
      console.log(this.userInput.value);
      let numberGuessed = this.userInput.value
      console.log(numberGuessed)
      if (numberGuessed < this.randomGeneratedNumber) {
        this.updateGameResponse(numberGuessed, "Higher")
      } else if (numberGuessed > this.randomGeneratedNumber) {
        this.updateGameResponse(numberGuessed, "Lower")
      } else if (numberGuessed == this.randomGeneratedNumber) {
        document.getElementById("gameResponse").innerHTML = "WINNER!"
      }
    })
  }

  higherOrLowerOrWinner() {
    let numberGuessed = this.userInput.value
    console.log(numberGuessed)
    if (numberGuessed < this.randomGeneratedNumber) {
      this.updateGameResponse(numberGuessed, "Higher")
    } else if (numberGuessed > this.randomGeneratedNumber) {
      this.updateGameResponse(numberGuessed, "Lower")
    } else if (numberGuessed == this.randomGeneratedNumber) {
      document.getElementById("gameResponse").innerHTML = "WINNER!"
    }
  }

  updateGameResponse(newGuess, status) {
    this.gameResults += newGuess + ", you have to go " + status + "\n" //Kolla varför detta n inte fungerar?
    document.getElementById("gameResponse").innerHTML = this.gameResults
  }
}





// v Logik som ska implementeras i klasser v

// const randomGeneratedNumber = random() // Denna ska köras när spelaren väljer att köra en ny omgång. 
// let gameResults = "";

// /**
//  * Randomizes a number
//  */
// function random() {
//   return parseInt(Math.random() * 100);
// }

// document.getElementById("play").addEventListener("click", higherOrLowerOrWinner)

// /**
//  * Compares the players input with the randomized number and then runs updateGameResponse with the guessed number and "higher" or "lower".
//  * If player guesses = Winner!
//  */
// function higherOrLowerOrWinner() {
//   console.log(randomGeneratedNumber)
//   numberGuessed = document.getElementById("numberGuessed").value
//   if (numberGuessed < randomGeneratedNumber) {
//     updateGameResponse(numberGuessed, "Higher")
//   } else if (numberGuessed > randomGeneratedNumber) {
//     updateGameResponse(numberGuessed, "Lower")
//   } else if (numberGuessed == randomGeneratedNumber) {
//     document.getElementById("gameResponse").innerHTML = "WINNER!"
//   }
// }

// /**
//  * Updates game response when the player pushes the "play" button
//  * @param {number} newGuess 
//  * @param {string} status 
//  */
// function updateGameResponse(newGuess, status) {
//   gameResults += newGuess + ", you have to go " + status + "\n" //Kolla varför detta n inte fungerar?
//   document.getElementById("gameResponse").innerHTML = gameResults
// }
