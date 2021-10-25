import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>
            <Route path="/" exact>
              <HomePage />
            </Route>
          </div>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
