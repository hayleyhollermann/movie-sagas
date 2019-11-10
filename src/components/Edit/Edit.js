import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GenreListItem from '../GenreListItem/GenreListItem';
import { TextField, Button } from '@material-ui/core';



const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {

  state = {
    movieGenres: this.props.reduxState.movieGenres,
    movie: this.props.reduxState.movieInfo,
  }

  componentDidMount() {
    this.getGenreList();
  }

  getGenreList = () => {
    console.log('in getGenreList');
    this.props.dispatch({type: 'ALL_GENRES'})
  }

  editDescription = (event) => {
    console.log('in editDescription');
    this.setState({
      ...this.state,
      movie:{
        ...this.state.movie,
        description: event.target.value
      }
    })  
  }

  saveDescription = () => {
    console.log('in saveDescription');
    this.props.dispatch({type: 'EDIT_DESCRIPTION', payload: this.state.movie})
  } 

  render() {
    return (
      <div className="MovieDescription">
        <h2>Edit Info for {this.props.reduxState.movieInfo.title}</h2>
        <TextField placeholder="description" multiline={true} fullWidth={true} value={this.state.movie.description} onChange={this.editDescription}/>
        <pre>{JSON.stringify(this.state.movie)}</pre>
        <p>Genres:</p>
        <ul>
          {this.props.reduxState.movieGenres.map((genre) => 
          <GenreListItem genre={genre} key={genre.id}/>
          )}
        </ul>
        <Button onClick={this.saveDescription}>Save Changes</Button>
        <Button>Cancel</Button>
        <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.movieInfo)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(Edit));