//Saves users as Player objects in local storage.
//To get current logged in player, use getCurrentHumanPlayer().
//To get all players list array, use getAllPlayerList().
//To get all Bots list array, use getAllBotsList().
//When changes to player have been made, save changes with saveAllPlayerList().
//To add a human player use, addPlayerToList(Player obj).
//To add a bot use, addBotToList(BotPlayer)

class PlayerManager{
    constructor() {
        /**
         * @type {HumanPlayer}
         */
        this.currentHumanPlayer

        /**
         * @type {string}
         */
        this.playerListLSName = 'playerList'

        /**
         * @type {string}
         */
        this.botsListLSName = 'botsList'
        
        /**
         * @type {Array<HumanPlayer>}
         */
        this.allPlayerList = []

        /**
         * @type {Array<BotPlayer>}
         */
        this.allBotsList = []

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
        }
        else{
            //create localStorage
            //console.log("Did not find player list, will create a new with a testPlayer")
            let playerList = []

            playerList.push(new HumanPlayer('Admin', 1))
            playerList.push(new HumanPlayer('test', 10))

            localStorage.setItem(this.playerListLSName, JSON.stringify(playerList))
            this.allPlayerList = playerList
        }

        //Create bots local storage.
        if(localStorage.getItem(this.botsListLSName) !== null){
            this.allBotsList = JSON.parse(localStorage.getItem(this.botsListLSName))
        }
        else{
            //create localStorage
            let botsList = []
            
            botsList.push(new BotPlayer('testBot', 1))
            botsList.push(new BotPlayer('Joey', 3))
            botsList.push(new BotPlayer('Elaine', 7))
            botsList.push(new BotPlayer('Amy', 18))

            localStorage.setItem(this.botsListLSName, JSON.stringify(botsList))
            this.allBotsList = botsList
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
     * Takes a string name input and returns a player obj if found, else returns a bool false.
     * @param {string} inBotName 
     * @return {(BotPlayer|false)}
     */
    findBot(inBotName){
        //return player or "false"
        let botFound = false
        let botObjReturn
        for (let bot of this.allBotsList) {
            //console.log(player.name)
            if(bot.name.toUpperCase() === inBotName.toUpperCase()){
                //console.log('bot found---------------')
                botFound = true
                botObjReturn = bot
            }else{
                //console.log(inBotName + ' not found ' + bot.name)
            }
        }

        if(botFound){
            return botObjReturn
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
            let humanPlayer = new HumanPlayer(inPlayerName,parseInt(Math.random()*10))
            this.allPlayerList.push(humanPlayer)

        }else{
            let foundPlayer = this.findPlayer(inPlayerName)
        }
        
        //save new player to LocalStorage
        this.saveAllPlayerAndBotsList()
    }

    /**
     * @return {HumanPlayer} Player
     */
    getCurrentHumanPlayer(){
        return this.currentHumanPlayer
    }

    /**
     * Save player list including current player to LocalStorage
     */
    saveAllPlayerAndBotsList(){
        localStorage.setItem(this.playerListLSName, JSON.stringify(this.allPlayerList))
        localStorage.setItem(this.botsListLSName, JSON.stringify(this.allBotsList))
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
     * Add human player to list if name is not in list, and save to LS.
     * @param {{HumanPlayer}} inputPlayer 
     */
    addPlayerToList(inputPlayer){
        //console.log(inputPlayer.name + ' add player name ')
        if(!this.findPlayer(inputPlayer.name)){
            this.allPlayerList.push(inputPlayer)
            //save list to LS after added to playerList array.
            this.saveAllPlayerAndBotsList()
        }
        else{
            //console.log(' player in list, will not add ')
        }
    }

    /**
     * Add bot to list if name is not in list, and save to LS.
     * @param {{BotPlayer}} inputBot 
     */
    addBotToList(inputBot){
        //console.log(inputPlayer.name + ' add player name ')
        if(!this.findBot(inputBot.name)){
            this.allBotsList.push(inputBot)
            //save list to LS after added to playerList array.
            this.saveAllPlayerAndBotsList()
        }
        else{
            //console.log(' bot in list, will not add ')
        }
        //TODO type check bots only.
    }

    getAllBotsList(){
        return this.allBotsList
    }

}