//code for game setup page
class GameSetupController {
  constructor() {
    // this.numberOfAIPlayersEl = document.getElementById("NumberOfAIPlayers");
    // this.numberOfAIPlayersEl.addEventListener(
    //   "keyup",
    //   this.printNumberOfAIPlayers.bind(this)
    // );
    // this.numberOfAIPlayers = 0;
    this.bot1 = document.getElementById("bot1");
    this.bot1.addEventListener("click", this.selectBot1.bind(this));
    this.bot2 = document.getElementById("bot2");
    this.bot2.addEventListener("click", this.selectBot2.bind(this));
    this.bot3 = document.getElementById("bot3");
    this.bot3.addEventListener("click", this.selectBot3.bind(this));
    this.activeBots = [];
  }

  getNumberOfAIPlayers() {
    return this.activeBots;
  }

  selectBot1() {
    bot1.classList.toggle("active");
    this.checkIfBotIsActive(this.bot1);
  }
  selectBot2() {
    bot2.classList.toggle("active");
    this.checkIfBotIsActive(this.bot2);
  }
  selectBot3() {
    bot3.classList.toggle("active");
    this.checkIfBotIsActive(this.bot3);
  }

  //Här kollar vi om boten är aktiv
  checkIfBotIsActive(bot) {
    this.activeBots = [];
    const botArray = document.querySelectorAll(".bots li");
    botArray.forEach(bot => {
      if (bot.classList.contains("active")) {
        this.activeBots.push(bot);
      }
    });
    console.log(this.activeBots);
  }
}
