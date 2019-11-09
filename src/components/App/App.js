import React, { Component } from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom';
import './App.css';

// import components
import MoviesList from '../MoviesList/MoviesList';
import MovieDescription from '../MovieDescription/MovieDescription';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM

  render() {
    return (
      <Router>
      <div className="App">
        <h1>GitFlix</h1>
        <Route exact path="/" component={MoviesList}/>
        <Route path="/movie-description" component={MovieDescription}/>
        <Route path="/edit" component={Edit} />
      </div>
      </Router>
    );
  }
}

export default App;
