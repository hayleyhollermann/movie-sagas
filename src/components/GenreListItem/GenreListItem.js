import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class GenreListItem extends Component {

  state = {
    edit:{
      genres: false,
    },
    genreToChange: {
        name: this.props.genre.name,
        movieGenreId: this.props.genre.id
    }
  }

  dropdownGenres = () => {
    this.setState({
        ...this.state,
        edit:{genres: !this.state.edit.genres}
    })
  }

  setNewGenre = (event) => {
    console.log('in setNewGenre', event.target.value);
    this.setState({
        ...this.state,
        genreToChange: event.target.value,
        edit: {genres: false}
    })
    console.log('new genre id =', this.state.newId);
    
  }

  render() {
    return (
      <div>
        {!this.state.edit.genres ? 
          (<li key={this.props.genre.id}>{this.state.newGenre}, id:{this.props.genre.id}
            <Button size="small" onClick={this.dropdownGenres}>Edit</Button>
            <Button size="small">Delete</Button>
          </li>) : 
          <select onChange={this.setNewGenre}>
            <option> </option>
            {this.props.reduxState.genres.map((genreItem) => 
              <option key={genreItem.id}>{genreItem.name}</option>
            )}
          </select>
        }
        {/* <pre>{JSON.stringify(this.props.reduxState.genres)}</pre> */}
        <pre>{JSON.stringify(this.props.genre)}</pre>
        <pre>{JSON.stringify(this.props.reduxState.movieGenres, null, 0)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreListItem));