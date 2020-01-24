//Saves users as Player objects in local storage.
//To get current logged in player, use getCurrentHumanPlayer().
//To get all players list array, use getAllPlayerList().
//When changes to player have been made, save changes with saveAllPlayerList().
//To add a bot or player use, addPlayerToList(Player obj).

class PlayerManager{
    constructor() {
        /**
         * @type {Player}
         */
        this.currentHumanPlayer

        /**
         * @type {string}
         */
        this.playerListLSName = 'playerList'
        
        /**
         * @type {Array<Player>}
         */
        this.allPlayerList = []

        //runs when the constructor start.
        this.startLocalStorage()
    }

    /**
     * Creates a new local storage if none can be found,
     * or loads existing local storage to this.allPlayerList[] array.
     */
    startLocalStorage(){
        //if localStorage does not exist, then create one.
        if(localStorage.getItem(this.playerListLSName) !== null){

            this.allPlayerList = JSON.parse(localStorage.getItem(this.playerListLSName))
            //console.log(this.allPlayerList)
        }
        else{
            //create localStorage
            //console.log("Did not find player list, will create a new with a testPlayer")
            let playerList = []
            playerList.push(new HumanPlayer('test'))
            playerList.push(new BotPlayer('testBot'))
            //console.log(playerList)
            localStorage.setItem(this.playerListLSName, JSON.stringify(playerList))
            this.allPlayerList = playerList
        }
    }

    /**
     * Takes a string name input and returns a player obj if found, else returns a bool false.
     * @param {string} inPlayerName 
     * @return {(Player|false)}
     */
    findPlayer(inPlayerName){
        //return player or "false"
        let playerFound = false
        let playerObjReturn
        for (let player of this.allPlayerList) {
            //console.log(player.name)
            if(player.name.toUpperCase() === inPlayerName.toUpperCase()){
                //console.log('player found---------------')
                playerFound = true
                playerObjReturn = player
            }else{
                //console.log(inPlayerName + ' not found ' + player.name)
            }
        }

        if(playerFound){
            return playerObjReturn
        }else{
            return false
        }
    }

    /**
     * Creates a new player if input name can not be found in player list.
     * @param {string} inPlayerName
     */
    createPlayer(inPlayerName){
        // new player
        if(!this.findPlayer(inPlayerName)){
            //console.log('player name not in list, will add.')
            let humanPlayer = new HumanPlayer(inPlayerName)
            this.allPlayerList.push(humanPlayer)

        }else{
            let foundPlayer = this.findPlayer(inPlayerName)
            //console.log('foundPlayer')
        }
        //console.log(this.allPlayerList)
        
        //save new player to LocalStorage
        this.saveAllPlayerList()
    }

    /**
     * @return {Player} Player
     */
    getCurrentHumanPlayer(){
        return this.currentHumanPlayer
    }

    /**
     * Save player list including current player to LocalStorage
     */
    saveAllPlayerList(){
        localStorage.setItem(this.playerListLSName, JSON.stringify(this.allPlayerList))
    }

    //input player object to set current logged in player from start page.

    /**
     * Takes a player obj input and loads it into currentHumanPlayer.
     * @param {Player} inputHumanPlayer 
     */
    setCurrentHumanPlayer(inputHumanPlayer){
        this.currentHumanPlayer = inputHumanPlayer
        //console.log(this.currentHumanPlayer)
    }

    /**
     * returns an array of all player objects.
     */
    getAllPlayerList(){
        return this.allPlayerList
    }

    /**
     * Add bot or human player to list if name is not in list and save to LS.
     * @param {{Player}} inputPlayer 
     */
    addPlayerToList(inputPlayer){
        //console.log(inputPlayer.name + ' add player name ')
        if(!this.findPlayer(inputPlayer.name)){
            this.allPlayerList.push(inputPlayer)
            //save list to LS after added to playerList array.
            this.saveAllPlayerList()
        }
        else{
            //console.log(' player in list, will not add ')
        }
    }


}