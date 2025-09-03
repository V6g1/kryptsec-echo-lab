import React, { useState } from 'react';
import Story from './pages/Story';
import Lab from './pages/Lab';
import './App.css';

function App() {
  const [storyComplete, setStoryComplete] = useState(false);

  return (
    <div className="App">
      {!storyComplete ? (
        <Story onStoryComplete={() => setStoryComplete(true)} />
      ) : (
        <Lab />
      )}
    </div>
  );
}

export default App;