// Detta är en abstrakt spelarklass som 
// användarens spelare samt botar kommer att utgå ifrån

class Player {
    constructor(name) {
        /**
         * @type {string}
         */
        this.name = name
        this.gamesPlayed = 0
    }
    
    /**
     * 
     * @param {number} inNumber 
     */
    setGamesPlayed(inNumber){
        this.gamesPlayed = inNumber
    }

    getGamesPlayed(){
        return this.gamesPlayed
    }
}