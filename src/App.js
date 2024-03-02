import React, { useEffect } from "react";
import "./style.css";
import Die from "./Components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./Components/Timer.js";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(1);

  useEffect(() => {
    // let arr=[dice[0].isHeld, dice[1].isHeld]
    const allEqual = dice.every((die) => die.value === dice[0].value);
    const allHeld = dice.every((die) => die.isHeld);
    if (allEqual && allHeld) {
      setTenzies(true);
      console.log("You WON!");
    }
  }, dice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        id: nanoid(),
        isHeld: false,
      });
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      holdDice={() => holdDice(die.id)}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));

  function rollDice(id) {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                ...die,
                value: Math.floor(Math.random() * 6) + 1,
                id: nanoid(),
              };
        })
      );
      setCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(1);
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div id="rules">
        <h1>Tenzies</h1>
        <p>
          {tenzies
            ? "You won!!!"
            : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
        </p>
      </div>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div>
        <p className="button-Count-Time">Rolls: {count}</p>
        <p>
          Timer: <Timer />
        </p>
      </div>
    </main>
  );
}
