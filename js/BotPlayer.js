// BotPlayer
// Logic = optimal
// Not yet fully functioning as it doesn't actually play, just logs... 
// GameController needs more work before implementation is ready

class BotPlayer extends Player {
    constructor(name) {
        super(name)
        this.previousGuesses = [0, 100]
        this.optimalValue = (this.previousGuesses[0]+this.previousGuesses[1])/2
        this.totalWins = 0 // || localstorage
        this.totalGuess = 0 // || localstorage
    }

    getStatistics(playerAmount){   
        // this.score = Math.round(((4 * Math.log(this.wins)) / 1.6 ) + ((this.wins) - (this.bot1amount * 0.3) - (this.bot2amount * 0.2) - (this.bot3amount * 0.1) / (this.amountguesses) * 100)
        this.score = ((4 * Math.log(this.totalWins) / 1.6) + (this.totalWins - playerAmount * .2)) / this.totalGuess
        return this.score
    }

    addToGuess() {
        this.totalGuess++
    }

    addToWins() {
        this.totalWins++
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
     * This returns the optimal value
     */
    activate() {
        console.log(`${this.name} returns ${this.optimalValue}`);
        return this.optimalValue
    }

    /**
     * This bots logic for making a new guess
     * @param {Number} guess The last made guess
     * @param {String} status The result of the last made guess
     */
    calculateNewOptimalGuess(guess, status) {
        this.findPlausibleValues(guess, status)

        const guessArray = this.previousGuesses;
        // console.log(guessArray);
        
        this.optimalValue = Math.floor((guessArray[0]+guessArray[1])/2);
        // console.log(`Bot ${this.name} would like to enter ${this.optimalValue}`);
          
    }
}