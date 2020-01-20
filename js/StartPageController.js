//code for start page
class StartPageController{
    constructor(){
        this.playerNameInputEl = document.getElementById('startNameInput')
        this.playerNameInputEl.addEventListener('keyup', this.printPlayerName.bind(this))
        this.humanPlayerName = ""
    }

    printPlayerName(){
        this.humanPlayerName = this.playerNameInputEl.value
        document.querySelector('.start-container').append(this.humanPlayerName)
    }

    getHumanPlayerName(){
        return this.humanPlayerName
    }
}