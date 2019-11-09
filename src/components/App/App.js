import React, { Component } from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom';
import './App.css';
import MoviesList from '../MoviesList/MoviesList';
import MovieDescription from '../MovieDescription/MovieDescription';


class App extends Component {
  // Renders the entire app on the DOM

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" component={MoviesList}/>
        <Route path="/movie-description" component={MovieDescription}/>
      </div>
      </Router>
    );
  }
}

export default App;
