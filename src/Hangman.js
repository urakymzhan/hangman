import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from './words';
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
  }
  reset = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord = () => {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess = (evt) => {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }
  checkGameStatus = (gameOver) => {
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameState = this.generateButtons();
    if (isWinner) gameState = "You Win!";
    if (gameOver) gameState = "You lose!";
    return gameState;
  }
  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const { maxWrong, images } = this.props;
    const gameOver = nWrong >= maxWrong;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <div>
          <img src={images[nWrong]} alt={`${nWrong}/${maxWrong} guesses`} />
        </div>
        <p id="wrong">Guessed Wrong: {nWrong}</p>
        <div>
          <p className='Hangman-word'>
            {
              !gameOver
                ? this.guessedWord()
                : answer
            }
          </p>
        </div>
        <p className='Hangman-btns'>
          {this.checkGameStatus(gameOver)}
        </p>
        <button id="reset" onClick={this.reset}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
