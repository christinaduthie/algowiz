import React, { useState } from 'react';
import AlgorithmDropdowns from './components/AlgorithmDropdowns.jsx';
import SortingVisualizer from './components/SortingVisualizer.jsx';
import SearchingVisualizer from './components/SearchingVisualizer.jsx';

function App() {
  const [algoType, setAlgoType] = useState('sorting'); // "sorting" or "searching"
  const [selectedAlgo, setSelectedAlgo] = useState('insertion-sort');

  return (
    <div className="app-container">
      {/* Dropdowns at the top */}
      <AlgorithmDropdowns
        algoType={algoType}
        setAlgoType={setAlgoType}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
      />

      {/* Depending on algoType, show Sorting or Searching visualizer */}
      {algoType === 'sorting' ? (
        <SortingVisualizer selectedAlgo={selectedAlgo} />
      ) : (
        <SearchingVisualizer selectedAlgo={selectedAlgo} />
      )}
    </div>
  );
}

export default App;
