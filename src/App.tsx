import React from 'react';
import './App.css';

import TaskList from "./components/TasksList"

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
