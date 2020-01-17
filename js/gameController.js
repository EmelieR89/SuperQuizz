  // Detta är klassen som kontrollerar användarens input 
  // och matchar mot det vinnande värdet

class GameController() {
  construktor() {

  }
}





// v Logik som ska implementeras i klasser v

const randomGeneratedNumber = random() // Denna ska köras när spelaren väljer att köra en ny omgång. 
let gameResults = "";

/**
 * Randomizes a number
 */
function random() {
  return parseInt(Math.random() * 100);
}

document.getElementById("play").addEventListener("click", higherOrLowerOrWinner)

/**
 * Compares the players input with the randomized number and then runs updateGameResponse with the guessed number and "higher" or "lower".
 * If player guesses = Winner!
 */
function higherOrLowerOrWinner() {
  console.log(randomGeneratedNumber)
  numberGuessed = document.getElementById("numberGuessed").value
  if (numberGuessed < randomGeneratedNumber) {
    updateGameResponse(numberGuessed, "Higher")
  } else if (numberGuessed > randomGeneratedNumber) {
    updateGameResponse(numberGuessed, "Lower")
  } else if (numberGuessed == randomGeneratedNumber) {
    document.getElementById("gameResponse").innerHTML = "WINNER!"
  }
}

/**
 * Updates game response when the player pushes the "play" button
 * @param {number} newGuess 
 * @param {string} status 
 */
function updateGameResponse(newGuess, status) {
  gameResults += newGuess + ", you have to go " + status + "\n" //Kolla varför detta n inte fungerar?
  document.getElementById("gameResponse").innerHTML = gameResults
}
