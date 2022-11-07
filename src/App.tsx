import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import "./App.css";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(getWord())

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters: string[] = guessedLetters.filter((letter) => {
    return !wordToGuess.includes(letter);
  });

  const correctLetters: string[] = guessedLetters.filter((letter) => {
    return wordToGuess.includes(letter);
  });

  const isLoser:boolean = incorrectLetters.length > 5
  const isWinner:boolean = wordToGuess.split("").every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter: Function = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((prevGuessedLetters) => {
        return [...prevGuessedLetters, letter];
      });
    },
    [guessedLetters, isWinner, isLoser]
  );

  // enable user to use keyboard to enter guesses 
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key;
      if (!letter.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(letter);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  });


  // restart game on Enter keypress
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());

    }

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  })

  return (
    <div className="container">
      <div className="gameMessage">
        {isWinner && "You won! Refresh to try again."}
        {isLoser && "You lost! Refresh to try again."}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard disabled={isWinner || isLoser} onLetterClick={addGuessedLetter} activeLetters={correctLetters} inActiveLetters={incorrectLetters} />
      </div>
    </div>
  );
}

export default App;
