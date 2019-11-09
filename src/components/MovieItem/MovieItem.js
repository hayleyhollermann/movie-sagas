import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState,
});

class MoviesItem extends Component {

  render() {
    return (
      <div className="MovieItem">
          <img src={this.props.movie.poster} alt={this.props.movie.title}/>
          <p>{this.props.movie.title}</p>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(MoviesItem);