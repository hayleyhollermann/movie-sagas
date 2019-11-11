import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import MovieItem from '../MovieItem/MovieItem';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MoviesList extends Component {

  componentDidMount() {
    this.getMovies();
  }

  // dispatches to getMoviesSaga
  getMovies = () => {
      console.log('in getMovies');
      this.props.dispatch({type: 'GET_MOVIES'})
  }

  render() {
    return (

      <div className="AllMovies">
        {/* map through movies array */}
        {this.props.reduxState.movies.map((movie) => 
            <div key={movie.id}><MovieItem movie={movie} key={movie.id}/></div>
        )}
      </div>
    );
  }
}

// export default withRouter(connect(mapReduxStateToProps)(MoviesList));
export default connect(mapReduxStateToProps)(MoviesList);
