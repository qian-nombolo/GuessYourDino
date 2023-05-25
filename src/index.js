import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DinasourService from './dinasour-service.js';

// Business Logic
function getDinasour() {
  let promise = DinasourService.getDinasour();
  promise.then(function(dinasourData) {
    processElements(dinasourData);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// UI Logic

function processElements(data) {
  let word = data[0][0].toLowerCase();
  // console.log(word);
  // const wordLength = 7;const guessedWord = Array(wordLength).fill('_');
  const maxGuesses = 7;
  const guesses = [];
  let incorrectGuesses = 0;
  
  const guessedWordElement = document.getElementById('guessedWord');
  const incorrectGuessesElement = document.getElementById('incorrectGuesses');
  const guessesElement = document.getElementById('guesses');
  const guessForm = document.getElementById('guessForm');
  const guessInput = document.getElementById('guessInput');
  // Initialize the guessed word with underscores
  const guessedWord = Array(word.length).fill('_');

  guessForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const guess = guessInput.value.toLowerCase();

    // Check if the input is a single character
    if (guess.length !== 1) {
      window.alert('Please enter a single character.');
      return;
    }

    // Check if the input has already been guessed
    if (guesses.includes(guess)) {
      window.alert('You have already guessed that letter.');
      return;
    }

    guesses.push(guess);

    if (word.includes(guess)) {
    // Update the guessed word with the correct guess
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guessedWord[i] = guess;
        }
      }
      return guessedWord;
      } else {
        incorrectGuesses++;
      }

// while (guessedWord.includes('_') && incorrectGuesses < maxGuesses) {}

  guessedWordElement.textContent = `Guessed Word: ${guessedWord.join(' ')}`;
  incorrectGuessesElement.textContent = `Incorrect Guesses: ${incorrectGuesses}`;
  guessesElement.textContent = `Guesses: ${guesses.join(', ')}`;

  if (!guessedWord.includes('_')) {
    document.querySelector('#showResponse').innerText = `Congratulations! You guessed the word: ${guessedWord.join('')}`;
    } else if (incorrectGuesses >= maxGuesses) {
    document.querySelector('#showResponse').innerText = `Out of guesses. The word was: ${word}`;
  }

  guessInput.value = null;
  }  
)}

function printError(error) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${error[1]}: ${error[0].status} ${error[0].statusText}.`;
}

// submission function
function handleFormSubmission(event) {
  event.preventDefault();
  getDinasour();
}

window.addEventListener("load", function() {
  document.querySelector('#dinasour').addEventListener("submit", handleFormSubmission);
});