import React from 'react';
import './App.css';

import Task from "./components/TasksList"

const App: React.FC = () => {
  return (
    <div className="App">
      <Task />
    </div>
  );
}

export default App;
