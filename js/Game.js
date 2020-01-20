// Detta är klassen som kör hela spelet, som alla andra klasser utgår ifrån
class Game {
    constructor() {
        this.bu
        this.gameController = new GameController()
    }

    startGame() {
        // console.log(this.gameController);
        
        this.gameController.addEventToPlay()
    }
}