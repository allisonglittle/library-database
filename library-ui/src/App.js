import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookManagement from './pages/BookManagement';
import PatronMangement from './pages/PatronManagement';
import AppHeader from './components/AppHeader';

function App() {
  return (
    <div className="App">
      
        <Router>
          <AppHeader />
          <div>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/book_management">
              <BookManagement />
            </Route>
            <Route path="/patron_management">
              <PatronMangement />
            </Route>
          </div>
        </Router>
        

    </div>
  );
}

export default App;
