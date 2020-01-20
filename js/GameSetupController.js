//code for game setup page
class GameSetupController{
    constructor(){
        this.numberOfAIPlayersEl = document.getElementById('NumberOfAIPlayers')
        this.numberOfAIPlayersEl.addEventListener('keyup', this.printNumberOfAIPlayers.bind(this))
        this.numberOfAIPlayers = 0
    }

    printNumberOfAIPlayers(){
        this.numberOfAIPlayers = this.numberOfAIPlayersEl.value
        document.querySelector('.game-setup-container').append(this.numberOfAIPlayers)
    }

    getNumberOfAIPlayers(){
        return this.numberOfAIPlayers
    }

}