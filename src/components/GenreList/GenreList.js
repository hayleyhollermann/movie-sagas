import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GenreListItem from '../GenreListItem/GenreListItem';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class GenreList extends Component {

  state = {
    addGenre: false,
    movieInfo: {
      movie: this.props.movie,
      genre: ''
    }
  }

  newGenreInput = (event) => {
    this.setState({
      ...this.state,
      movieInfo: {
        ...this.state.movieInfo,
        genre: event.target.value
      }
    })
  }

  // once button is clicked, conditional rendering
  toggleAddGenre = () => {
    console.log('in beginAddGenre');
    this.setState({
      ...this.state,
      addGenre: !this.state.addGenre
    })
  }

  cancelChanges = () => {
    this.props.dispatch({type: 'CLEAR_EDIT_GENRES'})
    this.props.history.push('/')
  }
  
  // saves changes, sends updates to redux sagas
  saveChanges = () => {
    console.log('in saveChanges');
    this.props.dispatch({type: 'EDIT_DETAILS', payload: this.props.movie});
    this.props.dispatch({type:'EDIT_GENRES', payload: this.props.reduxState.genreChanges});
    this.props.dispatch({type:'ADD_GENRE', payload: this.state.movieInfo});
    this.props.history.push('/');
  } 

  render() {
    return (
      <div>
        <p>Genres:</p>
        <ul>
          {this.props.reduxState.movieGenres.map((genre) => 
            <GenreListItem genre={genre} key={genre.id}/>
          )}
          <li>
            {this.state.addGenre ?
              <><select onChange={this.newGenreInput}>
                <option> </option>
                {this.props.reduxState.genres.map((genreItem) => 
                  <option key={genreItem.id}>{genreItem.name}</option>
                )}
              </select></>
              : <Button onClick={this.toggleAddGenre}>Add a New Genre</Button>
            }
          </li>
        </ul>
        <pre>{JSON.stringify(this.state)}</pre>
        <Button onClick={this.saveChanges}>Save Changes</Button>
        <Button onClick={this.cancelChanges}>Cancel</Button>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreList));