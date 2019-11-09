import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MoviesList extends Component {
  componentDidMount() {
    this.getMovies();
  }

  getMovies = () => {
      console.log('in getMovies');
      this.props.dispatch({type: 'GET_MOVIES'})
  }

  render() {
    return (
      <div className="App">
        <p>Empty Page</p>
      </div>
    );
  }
}

// export default withRouter(connect(mapReduxStateToProps)(MoviesList));
export default connect(mapReduxStateToProps)(MoviesList);
