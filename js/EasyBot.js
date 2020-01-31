// EasyBot
// Logic = optimal

class EasyBot extends Player {
  constructor(name) {
    super(name);
       this.previousGuesses = [0, 100];
       this.optimalValue; 
       this.totalGuess = 0;
       this.totalWins = 0;
       this.phrases = ['How you doin?', 
                       'I´m a Doctor, not a Matematician!', 
                       'Is that what a dinosaur would say?', 
                       'You´ve been bamboozled!!', 
                       'It´s like cow´s opinion. It just dosen´t matter. It´s Moo.', 
                       'I´m curvy and i like it!', 
                       'I call that "London style!"', 
                       'These are just feelings. They’ll go away.', 
                       'It hurts my Joey´s apple.', 
                       'Paper! Snow! A Ghost!' ];
        this.number;   
        this.randomNumb = [];

        //this.randomNumb = [];            
  }

  getStatistics(playerAmount) {
    this.score =
      ((4 * Math.log(this.totalWins)) / 1.6 +
        (this.totalWins - playerAmount * 0.2)) /
      this.totalGuess;
    return this.score;
  }
  
 /**
   * This adds to the number of guesses
   */
   addToGuess() {
    this.totalGuess++;
   }

   addToWins() {
    this.totalWins++;
  }

  /**
   * This returns the optimal value
   */
  activate() {
    this.calculateNewEasyGuess();
    console.log(`${this.name} returns ${this.optimalValue}`);
    return this.optimalValue;
  }

 /**
   * The logic for storing the closest guesses to the winning value
   * @param {Number} guess The last made guess
   * @param {String} status The result of the last made guess
   */
  findPlausibleValues(guess, status) {
    this.previousGuesses.push(guess);
    this.previousGuesses.sort(function(a, b) {
      return a - b;
    });
    if (this.previousGuesses.length > 2) {
      if (status == "Higher") {
        this.previousGuesses.splice(0, 1);
      } else if (status == "Lower") {
        this.previousGuesses.splice(2, 1);
      }
    }
  }

  /**
   * This bots logic for making a new guess
   * @param {Number} guess The last made guess
   * @param {String} status The result of the last made guess
   */
  calculateNewEasyGuess(guess, status) {
     this.findPlausibleValues(guess, status);
     this.randomNumb.push(parseInt(Math.random()*10));
     this.randomNumb.push(Math.random());

     console.log(this.randomNumb);
    
     const guessArray = this.previousGuesses;
     this.number = Math.floor((guessArray[0] + guessArray[1]) / 2) ;

     if (this.randomNumb[1]<.5) {
           this.optimalValue = this.phrases[this.randomNumb[0]];
     } else {
          switch (true) {
      case (this.totalGuess < 3):
       this.optimalValue = Math.floor((guessArray[0] + guessArray[1]) /2) + 6;
        break;
      case (this.totalGuess < 5):
       this.optimalValue = Math.floor((guessArray[0] + guessArray[1]) /2) + 4;
        break;
      case (this.totalGuess < 7):
        this.optimalValue = Math.floor((guessArray[0] + guessArray[1]) /2) - 5;
        break;
      case (this.totalGuess >= 10):
        this.optimalValue = Math.floor((guessArray[0] + guessArray[1]) /2);
        break;
    }
    }

     this.randomNumb.splice(0, 2);

  }
}
