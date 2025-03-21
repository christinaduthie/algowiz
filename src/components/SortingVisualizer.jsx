import React, { useState, useEffect, useRef } from 'react';
import insertionSortAnimations from '../algorithms/insertionSort.jsx';

function SortingVisualizer({ selectedAlgo }) {
  const [array, setArray] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [speed, setSpeed] = useState(500); // ms
  const [isRunning, setIsRunning] = useState(false);

  const animationsRef = useRef([]);
  const animIntervalRef = useRef(null);
  const currentStepRef = useRef(0);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArr = [];
    for (let i = 0; i < 25; i++) {
      newArr.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArr);
    setIsRunning(false);
    setHighlightedIndex(null);
    clearInterval(animIntervalRef.current);
  };

  const handleSort = () => {
    let generatedAnimations;
    switch (selectedAlgo) {
      case 'insertion-sort':
        generatedAnimations = insertionSortAnimations([...array]);
        break;
      default:
        // If user picks bubble-sort or quick-sort (stub),
        // we're currently reusing insertion sort for demonstration
        generatedAnimations = insertionSortAnimations([...array]);
        break;
    }

    animationsRef.current = generatedAnimations;
    currentStepRef.current = 0;
    setIsRunning(true);

    clearInterval(animIntervalRef.current);
    animIntervalRef.current = setInterval(() => {
      if (currentStepRef.current >= animationsRef.current.length) {
        clearInterval(animIntervalRef.current);
        setIsRunning(false);
        return;
      }
      const { array: newArray, highlighted } = animationsRef.current[currentStepRef.current];
      setArray(newArray);
      setHighlightedIndex(highlighted);
      currentStepRef.current++;
    }, speed);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(animIntervalRef.current);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);

    if (isRunning) {
      clearInterval(animIntervalRef.current);
      animIntervalRef.current = setInterval(() => {
        if (currentStepRef.current >= animationsRef.current.length) {
          clearInterval(animIntervalRef.current);
          setIsRunning(false);
          return;
        }
        const { array: newArray, highlighted } = animationsRef.current[currentStepRef.current];
        setArray(newArray);
        setHighlightedIndex(highlighted);
        currentStepRef.current++;
      }, newSpeed);
    }
  };

  return (
    <div>
      {/* Some control buttons plus the speed slider */}
      <div className="top-controls">
        <button onClick={generateRandomArray} disabled={isRunning}>
          Generate New Array
        </button>
        <button onClick={handleSort} disabled={isRunning}>
          Sort
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>

        <div className="slider-container">
          <label>Speed:</label>
          <input
            type="range"
            min="50"
            max="2000"
            step="50"
            value={speed}
            onChange={handleSpeedChange}
          />
        </div>
      </div>

      {/* Bars display */}
      <div className="bars-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`bar ${idx === highlightedIndex ? 'highlight' : ''}`}
            style={{
              height: `${value * 3}px`, // slightly taller bars for visibility
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;
