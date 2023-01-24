import React, { useState, useEffect } from "react";
import "./Visualizer.css";

function Visualizer(props) {
  const defaultPos = props.trace[0];
  // const colors = [
  //   "lightblue",
  //   "lightblue",
  //   "lightblue",
  //   "lightblue",
  //   "lightblue",
  //   // "lightcoral",
  //   // "lightgreen",
  //   // "lightsalmon",
  //   // "lightseagreen",
  // ];

  const [pos, setPos] = useState(defaultPos);
  const [swap, setSwap] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(1);

  const n = props.trace.length;
  const maxVal = Math.max(...props.arr);

  useEffect(() => {
    let timer;

    if (step >= n) {
      setStep(0);
      setIsRunning(false);
    } else if (isRunning) {
      timer = setTimeout(() => {
        setPos(props.trace[step]);
        setSwap(props.swaps[step - 1]);
        setStep((prevStep) => prevStep + 1);
      }, 300);
    }

    return () => {
      if (isRunning) {
        clearTimeout(timer);
      }
    };
  }, [pos, isRunning, step]);

  const startHandler = () => {
    setIsRunning(true);
  };

  const stopHandler = () => {
    setIsRunning(false);
  };

  const resetHandler = () => {
    setPos(defaultPos);
    setStep(1);
  };

  return (
    <>
      <p>Positions are: {pos.toString()}</p>
      <div className="container">
        {pos.map((position, index) => {
          const heightPercentage = `${(props.arr[index] * 100) / maxVal}%`;
          const color =
            swap && swap[1] == position ? "rgba(255, 0, 0, 0.5)" : "lightblue";
          const zIndex = swap && swap[1] == position ? 5 : 1;
          return (
            <div
              key={index}
              id={`${index}`}
              className="bar"
              style={{
                transform: `translate(${position * 100}px, 0px)`,
                zIndex: zIndex,
              }}
            >
              <div
                className="fill"
                style={{
                  background: color,
                  height: heightPercentage,
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <p>isRunning:{isRunning ? "true" : "false"}</p>
      <p>step:{step}</p>
      <button onClick={startHandler}>Start</button>
      <button onClick={stopHandler}>Stop</button>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
}

export default Visualizer;
