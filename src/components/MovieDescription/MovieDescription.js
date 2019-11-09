import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState
});

class MovieDescription extends Component {



  render() {
    return (
      <div>
          <h2>{this.props.reduxState.movieInfo.title}</h2>
          {this.props.reduxState.genres.map((genre) => 
            <p key={genre.name}>{genre.name}</p>)}
          <img src={this.props.reduxState.movieInfo.poster} alt={this.props.reduxState.movieInfo.title}/>
          <p>{this.props.reduxState.movieInfo.description}</p>
          {/* <p>{this.props.reduxState}</p> */}

          <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(MovieDescription));