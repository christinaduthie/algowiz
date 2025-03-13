import React from 'react';

function AlgorithmDropdowns({ algoType, setAlgoType, selectedAlgo, setSelectedAlgo }) {
  const sortingAlgos = [
    { label: 'Insertion Sort', value: 'insertion-sort' },
    { label: 'Bubble Sort (stub)', value: 'bubble-sort' },
    { label: 'Quick Sort (stub)', value: 'quick-sort' }
  ];

  const searchingAlgos = [
    { label: 'Linear Search (stub)', value: 'linear-search' },
    { label: 'Binary Search (stub)', value: 'binary-search' }
  ];

  const currentOptions = algoType === 'sorting' ? sortingAlgos : searchingAlgos;

  return (
    <div className="top-controls">
      <div className="dropdown-container">
        <label htmlFor="algoTypeSelect">Category:</label>
        <select
          id="algoTypeSelect"
          value={algoType}
          onChange={(e) => setAlgoType(e.target.value)}
        >
          <option value="sorting">Sorting Algorithms</option>
          <option value="searching">Searching Algorithms</option>
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="specificAlgoSelect">Algorithm:</label>
        <select
          id="specificAlgoSelect"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
        >
          {currentOptions.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AlgorithmDropdowns;
