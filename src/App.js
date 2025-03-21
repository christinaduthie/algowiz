import React, { useState } from 'react';
import AlgorithmDropdowns from './components/AlgorithmDropdowns.jsx';
import SortingVisualizer from './components/SortingVisualizer.jsx';
import SearchingVisualizer from './components/SearchingVisualizer.jsx';

function App() {
  const [algoType, setAlgoType] = useState('sorting'); // "sorting" or "searching"
  const [selectedAlgo, setSelectedAlgo] = useState('insertion-sort');

  return (
    <div className="app-container">
      {/* Our "top" area with dropdowns; styled as a sticky header via CSS */}
      <AlgorithmDropdowns
        algoType={algoType}
        setAlgoType={setAlgoType}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
      />

      {/* Main content area showing either sorting or searching */}
      {algoType === 'sorting' ? (
        <SortingVisualizer selectedAlgo={selectedAlgo} />
      ) : (
        <SearchingVisualizer selectedAlgo={selectedAlgo} />
      )}
    </div>
  );
}

export default App;
