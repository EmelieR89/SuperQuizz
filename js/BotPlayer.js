// BotPlayer
// Logic = optimal
// Not yet fully functioning as it doesn't actually play, just logs... 
// GameController needs more work before implementation is ready

class BotPlayer extends Player {
    constructor() {
        super()
        this.previousGuesses = [0, 100]
    }

    /**
     * The logic for storing the closest guesses to the winning value
     * @param {Number} guess The last made guess
     * @param {String} status The result of the last made guess
     */
    findPlausibleValues(guess, status) {
        this.previousGuesses.push(guess)
        this.previousGuesses.sort(function(a, b) {
            return a - b;
        })
        if (this.previousGuesses.length > 2) {
            if(status == "Higher") {
                this.previousGuesses.splice(0, 1)
            }
            else if(status == "Lower") {
                this.previousGuesses.splice(2,1)
            }
        }
    }

    /**
     * This bots logic for making a new guess
     * @param {Number} guess The last made guess
     * @param {String} status The result of the last made guess
     */
    calculateAndReturnNewGuess(guess, status) {
        this.findPlausibleValues(guess, status)

        const guessArray = this.previousGuesses;
        console.log(guessArray);
        
        const optimalValue = Math.floor((guessArray[0]+guessArray[1])/2);
        console.log(optimalValue);
          
    }
}