//code for game setup page
class GameSetupController{
    constructor(){
        this.numberOfAIPlayersEl = document.getElementById('NumberOfAIPlayers')
        this.numberOfAIPlayersEl.addEventListener('keyup', this.printNumberOfAIPlayers.bind(this))
        this.numberOfAIPlayers = 0
        this.bot1 = document.getElementById('bot1').addEventListener('click',this.selectBot1.bind(this))
        this.bot2 = document.getElementById('bot2').addEventListener('click',this.selectBot2.bind(this))
        this.bot3 = document.getElementById('bot3').addEventListener('click',this.selectBot3.bind(this))
        this.activeBots = []
    }

    printNumberOfAIPlayers(){
        this.numberOfAIPlayers = this.numberOfAIPlayersEl.value
        document.querySelector('.game-setup-container').append(this.numberOfAIPlayers)
    }

    getNumberOfAIPlayers(){
        return parseInt(this.numberOfAIPlayers)
    }

    selectBot1(){
        bot1.classList.toggle("active");
    }
    selectBot2(){
        bot2.classList.toggle("active");
    }
    selectBot3(){
        bot3.classList.toggle("active");
    }

    checkIfBotIsActive() {
        //Här kollar vi om boten är aktiv const active = bot.classlist.contains(klassen) TRUE FALSE
        //Om aktiv, lägg till bot i array (separat funktion) if (active)
        //Annars, ta bort

        //logga ut this.activeBots
    }

}
// let el = document.getElementById('bot1')
// if (el.style.opacity = "1") {
//     document.getElementById('bot1').style.opacity = '0.5';
//     console.log("klick 1");
    
// }
// else if (el.style.opacity = '0.5') { 
//     document.getElementById('bot1').style.opacity = '1';
//     console.log('klickat 2'); } 

