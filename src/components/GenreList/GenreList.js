import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GenreListItem from '../GenreListItem/GenreListItem';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class GenreList extends Component {

  cancelChanges = () => {
    this.props.history.push('/')
  }

  saveChanges = () => {
    console.log('in saveChanges');
    this.props.dispatch({type: 'EDIT_DETAILS', payload: this.props.movie})
    this.props.dispatch({type:'EDIT_GENRES', payload: this.props.reduxState.genreChanges})
    // this.props.dispatch({type: 'EDIT_TITLE', payload: this.props.movie})
    this.props.history.push('/')
  } 

  render() {
    return (
      <div>
        <p>Genres:</p>
        <ul>
          {this.props.reduxState.movieGenres.map((genre) => 
            <GenreListItem genre={genre} key={genre.id}/>
          )}
        </ul>
        <Button onClick={this.saveChanges}>Save Changes</Button>
        <Button onClick={this.cancelChanges}>Cancel</Button>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreList));