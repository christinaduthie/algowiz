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

  // Generate a random array once on mount
  useEffect(() => {
    generateRandomArray();
  }, []);

  // Generate random array
  const generateRandomArray = () => {
    const newArr = [];
    for (let i = 0; i < 20; i++) {
      // values between 5 and 100
      newArr.push(Math.floor(Math.random() * 96) + 5);
    }
    setArray(newArr);
    setIsRunning(false);
    setHighlightedIndex(null);
    clearInterval(animIntervalRef.current);
  };

  // Handle sorting
  const handleSort = () => {
    let generatedAnimations;
    switch (selectedAlgo) {
      case 'insertion-sort':
        generatedAnimations = insertionSortAnimations([...array]);
        break;
      default:
        // For stubs like bubble-sort or quick-sort, you could fill in your own logic
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

  // Pause
  const handlePause = () => {
    setIsRunning(false);
    clearInterval(animIntervalRef.current);
  };

  // Handle speed change
  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);

    // If currently running, reset interval with new speed
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

      <div className="bars-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`bar ${idx === highlightedIndex ? 'highlight' : ''}`}
            style={{
              height: `${value * 2}px`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;
