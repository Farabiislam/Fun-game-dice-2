'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnHold = document.querySelector('.btn--hold');
const player0Name = document.querySelector('.name0');
const player1Name = document.querySelector('.name1');
const overly1 = document.querySelector('.overlay');
const overForm = document.querySelector('.form');
const button1 = document.querySelector('.button');
const input1 = document.querySelector('.input');
const input2 = document.querySelector('.input1');


let scores, currentScore, activePlayer, playing;

// window.onload = function () {
//   overly1.classList.remove('hidden');
//   overForm.classList.remove('hidden');
// };

button1.addEventListener('click', function (event) {
    
      
  if(event.target.textContent === 'PLAY'){
      overly1.classList.add('hidden');
      overForm.classList.add('hidden');
      player0Name.innerHTML = input1.value;  
      if(player0Name != " " ){
         player1Name.innerHTML = input2.value;  
      }
    
  }
  event.preventDefault();
});


//Start condition
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//player switch function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//dice Roll function
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //rolled for player 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//score hold function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
