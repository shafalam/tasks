import React from 'react';
import logo from './logo.svg';
import './App.css';

import CheckboxList from "./components/TasksList"

const App: React.FC = () => {
  return (
    <div className="App">
      <body>
        <CheckboxList />
      </body>
    </div>
  );
}

export default App;
