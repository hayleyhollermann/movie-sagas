import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState
});

class MovieDescription extends Component {

  editInfoPage = (movie) => {
      console.log('in editInfoPage', movie.title);
      this.props.history.push('/edit')
  }

  render() {
    return (
      <div class ="MovieDescription">
          <h2>{this.props.reduxState.movieInfo.title}</h2>
          <img src={this.props.reduxState.movieInfo.poster} alt={this.props.reduxState.movieInfo.title}/> < br/>
          {this.props.reduxState.movieGenres.map((genre) => 
            <span class="genreSpan" key={genre.name}>{genre.name}</span>)}
          <p>{this.props.reduxState.movieInfo.description}</p>
          <button onClick={() => this.editInfoPage(this.props.reduxState.movieInfo)}>Edit Info</button>
          <pre>{JSON.stringify(this.props.reduxState.movieGenres)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(MovieDescription));