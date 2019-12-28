import React from 'react';
import './App.css';

import CheckboxList from "./components/TasksList"

const App: React.FC = () => {
  return (
    <div className="App">
      <CheckboxList />
    </div>
  );
}

export default App;
