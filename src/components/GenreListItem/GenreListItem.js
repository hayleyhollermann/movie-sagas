import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';


const mapReduxStateToProps = reduxState => ({
    reduxState
});

class GenreList extends Component {

  state = {
    edit:{
      genres: false,
    },
    genreToChange: {
        name: this.props.genre.name,
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
        genreToChange: {name: event.target.value},
        edit: {genres: false},
    })
    this.props.dispatch({type: 'SET_NEW_GENRE', payload: {name: event.target.value, id: this.props.genre.id}})
  }

  cancelChanges = () => {
    this.props.history.push('/')
    // function to clear reducer
  }

  render() {
    return (
      <div>
        {!this.state.edit.genres ? 
          (<li key={this.props.genre.id}>{this.state.genreToChange.name}, id:{this.props.genre.id}
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
        <pre>{JSON.stringify(this.state)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreList));