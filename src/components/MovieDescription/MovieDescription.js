import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

const mapReduxStateToProps = reduxState => ({
    reduxState
});

class MovieDescription extends Component {

  editInfoPage = (movie) => {
      console.log('in editInfoPage', movie.title);
      this.props.history.push('/edit')
  }

  backToList = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div class ="MovieDescription">
          <Button onClick={this.backToList}><ArrowBackRoundedIcon fontSize="large" /></Button>
          <h2>{this.props.reduxState.movieInfo.title}</h2>
          <img src={this.props.reduxState.movieInfo.poster} alt={this.props.reduxState.movieInfo.title}/> < br/>
          {this.props.reduxState.movieGenres.map((genre) => 
            <span class="genreSpan" key={genre.name}>{genre.name}</span>)}
          <p>{this.props.reduxState.movieInfo.description}</p>
          <Button onClick={() => this.editInfoPage(this.props.reduxState.movieInfo)}>Edit Info</Button>
          <pre>{JSON.stringify(this.props.reduxState.movieGenres)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(MovieDescription));