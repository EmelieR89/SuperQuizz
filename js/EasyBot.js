// EasyBot
// Logic = optimal

class EasyBot extends Player {
  constructor(name, score) {
    super(name, score);
       this.optimalValue; 
       this.totalGuess = 0;
       this.phrases = ['How you doin?', 
                       'I´m a Doctor, not a Matematician!', 
                       'Is that what a dinosaur would say?', 
                       'You´ve been bamboozled!!', 
                       'It´s like cow´s opinion. It just dosen´t matter. It´s Moo.', 
                       'I´m curvy and i like it!', 
                       'I call that "London style!"', 
                       'These are just feelings. They’ll go away.', 
                       'Over the line? You’re so far past the line that you can’t even see the line! The line is a dot to you!', 
                       'Paper! Snow! A Ghost!' ];
  }
 /**
   * This adds to the number of guesses
   */
   addToGuess() {
    this.totalGuess++;
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
   * This bots logic for making a new guess
   * @param {Number} guess The last made guess
   * @param {String} status The result of the last made guess
   */
  calculateNewEasyGuess(guess, status) {
    let randomNumb = parseInt(Math.random()*10);

    this.optimalValue = this.phrases[randomNumb];

  }
}
