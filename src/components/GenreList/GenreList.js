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
    this.props.dispatch({type: 'EDIT_DESCRIPTION', payload: this.props.movie})
    // if (this.state.genresToChange.length>0){
    //   this.props.dispatch({type:'EDIT_GENRES', payload: {movieId: this.props.reduxState.movieInfo.id, genresToChange: this.state.genresToChange}})
    // }
    this.props.history.push('/')
  } 

  render() {
    return (
      <div>
        <p>Genres:</p>
        <ul>
          {this.props.reduxState.movieGenres.map((genre) => 
            <GenreListItem genre={genre} />
          )}
        </ul>
        <pre>{JSON.stringify(this.state)}</pre>
        <Button onClick={this.saveChanges}>Save Changes</Button>
        <Button onClick={this.cancelChanges}>Cancel</Button>
        <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.movieInfo)}</pre>
        <pre>{JSON.stringify(this.props.genre)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.movieGenres, null, 0)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreList));