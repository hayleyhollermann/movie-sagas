import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GenreListItem from '../GenreListItem/GenreListItem';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {

  state = {
    edit:{
        genres: false,
    }
  }

  componentDidMount() {
    this.getGenreList();
  }

  getGenreList = () => {
      console.log('in getGenreList');
      this.props.dispatch({type: 'ALL_GENRES'})
  }

  dropdownGenres = () => {

  }

  render() {
    return (
      <div>
          <h2>Edit Info for {this.props.reduxState.movieInfo.title}</h2>
          <input placeholder="description"/>
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