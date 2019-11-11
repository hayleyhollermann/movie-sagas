import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MoviesItem extends Component {
  
  // gets details and genres for each movie
  getInfo = (movie) => {
    console.log(movie.title);
    this.props.dispatch({type: 'SEE_INFO', payload: movie.id});
    this.props.dispatch({type: 'GET_GENRES', payload: movie.id})
    this.props.history.push(`/movie-description`)
  }

  render() {
    return (
      <div key={this.props.movie.id} className="MovieItem" onClick={()=>this.getInfo(this.props.movie)}>
          <img src={this.props.movie.poster} alt={this.props.movie.title}/>
          <h3>{this.props.movie.title}</h3>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(MoviesItem));