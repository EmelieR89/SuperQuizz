// Denna klassen håller koll på vem som vann och hur många gånger de har vunnit
class HighScore { 
    constructor(playerManager){
        this.playerManager = playerManager
        this.names = []
        this.tempHighScore = []
        this.tempNamesHistory = []
        this.highScore = JSON.parse(localStorage.getItem('highScoreHistory'))
        this.names = JSON.parse(localStorage.getItem('namesHistory'))
        this.highScoreArray = this.playerManager.getAllPlayerList()
        console.log(this.highScoreArray)
        this.sessionSort()
        console.log(this.highScoreArray)
    }

    /**
     * Gets local history
     */
   /* parseHistory(){
        function parse() {
            this.highScore = JSON.parse(localStorage.getItem('highScoreHistory'))
            this.names = JSON.parse(localStorage.getItem('namesHistory'))
        } 
        parse()
    } */
 
    /**
     * Stores local session
     */
    storeSession(){
        var name = JSON.parse(localStorage.getItem('humanName'))
        var guessPercentage = 1/parseInt(JSON.parse(localStorage.getItem('guessedNumber')))
        this.highScore.push(guessPercentage)
        this.tempHighScore = this.highScore
        this.names.push(name)
    }

    /**
     * Sorts high score high to low and adjusts the player names accordingly
     */
    sessionSort(){
        this.highScoreArray.sort(
            function(a,b){
                if (a.score > b.score) {
                    return -1
                }
                else if (a.score < b.score){
                    return 1
                }
                return 0
        })

        // for (i = 0; i < this.highScore.length; i++){
        //    if (this.highScore[i] != this.tempHighScore[i]){
        //         var tempStorage = this.names[i]
        //         this.names[i] = this.names[i++]
        //         this.names[i++] = tempStorage
        //         tempStorage = this.tempHighScore [i]
        //         this.tempHighScore [i] = this.tempHighScore [i++]
        //         this.tempHighScore [i++] = tempStorage
        //    }
        // }
    }

    /**
     * Stores the new high score and name data
     */
    storeNewSession(){
        localStorage.setItem('highScoreHistory', JSON.stringify(this.highScore))
        localStorage.setItem('namesHistory', JSON.stringify(this.names))
    }

    /**
     * posts the high score on the webbpage 
     */
    postHighScore(){
        for (i=0; i < this.highScore.length; i++){
            document.getElementById('highScore').writeln(this.highScore[i])
        } 
    }

    /**
     * Runs when game over
     */
    static checkGameStatus() {
        console.log('now it works')
        if (GameController.getGameOver()){
            this.storeSession()
            this.sessionSort()
            this.storeNewSession()
            this.postHighScore()
        }
        return(null)
    }

}
