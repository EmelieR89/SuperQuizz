class GameController {
  constructor(game) {
    this.game = game;
    this.randomGeneratedNumber = this.generateRandomNumber();
    this.activePlayerTitle = document.querySelector(".player-turn");
    this.winnerPlayerTitle = document.querySelector(
      ".game-winner-container h2"
    );
    this.timerCircle = document.querySelector('.timer-circle path');
    this.winnerNumberTitle = document.querySelector(".win-con");
    this.timeLeftText = document.querySelector('.time-left');
    this.gameResults = "";
    this.list = [];
    this.turn = 0;
    this.gameOver = false;
  }

  /**
   * Logic for cycling player turns
   */
  cyclePlayerTurns() {
    if (this.turn > this.playerTurns.length - 1) {
      this.turn = 0;
    }
    if (!this.gameOver) {
      this.updateActivePlayer();
      this.addTimerToAnswer();
      this.updatePlayerTurnVisuals();
      this.checkIfBotTurn();
      this.turn++;
    }
  }

  /**
   * Adds a timer to the answer event and times out player if time runs out (10 seconds)
   */
  addTimerToAnswer() {
    const activePlayer = this.activePlayer
    let timerValue = 0;
    let timerText = 1000
    let answerTimer = setInterval(() => {
      timerValue++
      timerText--
      this.updateTimerVisuals(timerValue, timerText)

      if (timerValue === 1000 || activePlayer != this.activePlayer || this.gameOver) {
        clearInterval(answerTimer)
        if (timerValue === 1000) {
          this.checkPlayerInput('Timeout!')
        }
      }
    }, 10);
  }

  /**
   * Creates elements for the player input div.
   */
  createPlayInputs() {
    const div = document.querySelector('.user-input-field')
    const button = document.createElement('button')
    const error = document.createElement('h5')
    const input = document.createElement('input')

    button.setAttribute('id', 'play')
    button.innerHTML = 'Play'

    error.setAttribute('id', 'messageIfInputIsWrong')

    input.setAttribute('id', 'numberGuessed')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'pick a number')
    input.setAttribute('pattern', '\d*')

    div.appendChild(input)
    div.appendChild(error)
    div.appendChild(button)
    this.playButton = button
    this.errorMsg = error
    this.userInput = input
  }

  /**
   * Removes the elements in input div so they can be replaced when new GameController
   */
  destroyTheElementsInInputDiv() {
    const div = document.querySelector('.user-input-field')
    div.removeChild(this.playButton)
    div.removeChild(this.userInput)
    div.removeChild(this.errorMsg)
  }


  updateTimerVisuals(timerValue, timerText) {
    timerValue = timerValue / 10
    timerText = parseFloat(timerText / 100).toFixed(1)
    this.timeLeftText.innerHTML = timerText
    this.timerCircle.setAttribute("stroke-dasharray", `${timerValue}, 100`)
  }

  /**
   * Updates the active player based from turn and checks if that player is a bot
   */
  updateActivePlayer() {
    this.activePlayer = this.playerTurns[this.turn];
    this.activePlayer.addTotalGuess();
  }

  /**
   * Checks if active player is a bot and retrieves answer if it is
   */
  checkIfBotTurn() {
    if (this.activePlayer instanceof HardBot || this.activePlayer instanceof EasyBot || this.activePlayer instanceof MediumBot) {
      const activeBot = this.activePlayer;
      this.retrieveAnswerFromBot(activeBot);
      this.activePlayer.addToGuess();
    }
  }

  /**
   * Updates the title based on turn
   */
  updatePlayerTurnVisuals() {
    this.activePlayerTitle.innerHTML = this.activePlayer.name;
    if (this.activePlayer instanceof HardBot || this.activePlayer instanceof EasyBot || this.activePlayer instanceof MediumBot) {
      this.userInput.disabled = true;
      this.userInput.style.opacity = 0.4;
      this.playButton.disabled = true;
      this.playButton.classList.add("bot-active");
      this.playButton.classList.remove("human-active");
    } else {
      this.userInput.disabled = false;
      this.userInput.style.opacity = 1;
      this.playButton.disabled = false;
      this.userInput.focus();
      this.playButton.classList.remove("bot-active");
      this.playButton.classList.add("human-active");
    }
  }

  /**
   * Retrieves the answer from the active HardBot with a delay
   * @param {HardBot} activeBot The active HardBot
   */
  retrieveAnswerFromBot(activeBot) {
    const numberGuessed = activeBot.activate();
    const generateRandomDelay = parseInt(Math.random() * 4000 + 500);
    setTimeout(() => {
      this.checkPlayerInput(numberGuessed);
    }, generateRandomDelay);
  }

  /**
   * Creates an array of players based of the number input in Game Setup
   * @param {Number} nOfPlayers Number of AI players input
   */
  createPlayerTurns(nOfPlayers) {
  const humanPlayer = new HumanPlayer(this.game.currentPlayerName) //test was 'hooman' before
    
    this.nOfPlayers = nOfPlayers;
    let playerArray = [];
    let humanPlayerTurn = parseInt(Math.random() * (nOfPlayers.length + 1));

    nOfPlayers.forEach(bot => {
      if (bot.classList.contains("easyBot")) {
        playerArray.push(new EasyBot("Joey"));
      } 
      if (bot.classList.contains("mediumBot")) {
        playerArray.push(new MediumBot("Elaine"));
      }
      if (bot.classList.contains("hardBot")) {
        playerArray.push(new HardBot("Amy"));
      }
    });

playerArray.splice(humanPlayerTurn, 0, humanPlayer)
console.log(playerArray);

    // for (let i = 0; i < nOfPlayers.length + 1; i++) {
    //   if (i === humanPlayerTurn) {
    //     playerArray.push(new HumanPlayer("hooman"));
    //     // localStorage.setItem("humanName", JSON.stringify(playerArray[0]));
    //   } else {
    //     playerArray.push(new HardBot(`Bot ${i}`));
    //   }
    // }
    this.playerTurns = playerArray;
    console.log(this.playerTurns);
  }

  /**
   * Returns a random number between 1 and 100
   */
  generateRandomNumber() {
    let rndnum = parseInt(Math.random() * 100);
    if (rndnum === 0) {
      rndnum = 1
    }
    localStorage.setItem("rndnum", JSON.stringify(rndnum));
    return rndnum;
  }

  /**
   * Adds an eventlistener to the input button
   */
  addEventToPlay() {
    this.playButton.addEventListener("click", () => {
      console.log(this.version);

      const numberGuessed = parseInt(this.userInput.value);
      this.clearPlayerInput();
      if (numberGuessed > 100 || isNaN(numberGuessed) || numberGuessed <= 0) {
        this.wrongInputFormat(numberGuessed);
        return;
      } else {
        this.checkPlayerInput(numberGuessed);
      }
    });
  }

  /**
   * Makes enter key work in game-play-container.
   */
  addEventToInput() {
    this.userInput.addEventListener("keyup", event => {
      const numberGuessed = parseInt(this.userInput.value);
      if (event.key === "Enter") {
        this.clearPlayerInput();
        if (numberGuessed > 100 || isNaN(numberGuessed) || numberGuessed <= 0) {
          this.wrongInputFormat(numberGuessed);
          return;
        } else {
          this.checkPlayerInput(numberGuessed);
        }
      }
    });
  }

  /**
   * Runs if wrong format on input, or if it's higher then 100 or lower then 0
   */
  wrongInputFormat() {
    let wrongFormatOnInput = document.getElementById("messageIfInputIsWrong");
    wrongFormatOnInput.innerHTML = "Pick a number between 1-100";
    wrongFormatOnInput.className = "wrongInputMessage";
  }

  /**
   * Clears input
   */
  clearPlayerInput() {
    this.userInput.value = "";
    let wrongFormatOnInput = document.getElementById("messageIfInputIsWrong");
    wrongFormatOnInput.innerHTML = "";
  }

  /**
   * Checks the user input with the winning number
   * @param {Number} input User input
   */
  checkPlayerInput(input) {
    if (input < this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Higher");
      this.setListGuessedNumber(input);
    } else if (input > this.randomGeneratedNumber) {
      this.updateGameResponse(input, "Lower");
      this.setListGuessedNumber(input);
    } else if (input === this.randomGeneratedNumber) {
      this.gameOver = true;
      if (this.activePlayer instanceof HardBot || this.activePlayer instanceof EasyBot || this.activePlayer instanceof MediumBot) {
        this.activePlayer.addToWins();
        // const stats = this.activePlayer.getStatistics(this.nOfPlayers);
      }
      this.goToWinnerPage();
      // HighScore.this.checkGameStatus();
    } else if (input === "Timeout!") {
      this.updateGameResponse(input);
    }

    else if (this.activePlayer instanceof EasyBot) {
      this.updateGameResponse(input, "Joey...");
      this.setListGuessedNumber(input)
    }

  }

  getGameOver() {
    return this.gameOver;
  }

  /**
   * Shows game state to over and presents the winner
   */
  goToWinnerPage() {
    this.activePlayer.addTotalWins()
    console.log(this.activePlayer.name + ' winner')
    this.destroyTheElementsInInputDiv()
    this.updateWinnerPlayerTitle();
    this.updateWinnerNumberTitle();
    this.game.showPage("game-winner-container");
  }

  /**
   * Updates the winning player title
   */
  updateWinnerPlayerTitle() {
    this.winnerPlayerTitle.innerHTML = `${this.activePlayer.name}`;
  }

  /**
   * Updates the winning number
   */
  updateWinnerNumberTitle() {
    this.winnerNumberTitle.innerHTML = `${this.randomGeneratedNumber}`;
  }

  /**
   * Prints a list of the guessed numbers and stores them in Local storage
   * @param {Number} numberInput User input
   */
  setListGuessedNumber(numberInput) {
    this.list.push(numberInput);
    let ul = document.getElementById("guessedNumbersFromPlayer");
    ul.innerHTML = "";
    for (let guess of this.list) {
      let li = document.createElement("li");
      li.innerHTML = guess;
      ul.appendChild(li);
    }
    ul.className = "guessedNumbersShown";
  }

  /**
   * Prints the game controller's answer to a players input
   * @param {number} newGuess The player's guess
   * @param {String} status The result of the input
   */
  updateGameResponse(newGuess, status) {
    if (newGuess === "Timeout!") {
      this.gameResults = newGuess;
    } 
    else if (isNaN(newGuess)) {
      this.gameResults = status 
    }
    else {
      this.playerTurns.forEach(player => {
        switch (true) {
          case player instanceof HardBot:
            player.calculateNewOptimalGuess(newGuess, status);
            break;
          case player instanceof EasyBot:
          player.calculateNewEasyGuess(newGuess, status);
          break;
          case player instanceof MediumBot:
          player.calculateNewMediumGuess(newGuess, status);
          break;
        }


        // if (player instanceof HardBot) {
        //   player.calculateNewOptimalGuess(newGuess, status);
        // }
      });
      this.gameResults = "Go " + status + "!";
    }
    document.getElementById("gameResponse").innerHTML = this.gameResults;
    if (!this.gameOver) {
      this.cyclePlayerTurns();
    }
  }
}
