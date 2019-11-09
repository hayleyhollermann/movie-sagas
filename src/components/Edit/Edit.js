import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GenreListItem from '../GenreListItem/GenreListItem';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {

  state = {
    movie: this.props.reduxState.movieInfo
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
      <div>
        <h2>Edit Info for {this.props.reduxState.movieInfo.title}</h2>
        <input placeholder="description" value={this.state.movie.description} onChange={this.editDescription}/>
        <button onClick={this.saveDescription}>Save Changes</button>
        <pre>{JSON.stringify(this.state.movie)}</pre>
        <p>Genres:</p>
        <ul>
          {this.props.reduxState.movieGenres.map((genre) => 
          <GenreListItem genre={genre} key={genre.id}/>
          )}
        </ul>
        <button>Save</button>
        <button>Cancel</button>
        <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.movieInfo)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(Edit));