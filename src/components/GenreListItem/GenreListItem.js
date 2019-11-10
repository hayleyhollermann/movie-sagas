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
    newId: '',
  }

  dropdownGenres = () => {
    this.setState({
        ...this.state,
        edit:{genres: !this.state.edit.genres}
    })
  }

  setNewGenre = (event) => {
    console.log('in setNewGenre');
    this.setState({
        ...this.state,
        newId: event.data
    })
    console.log('new genre id =', this.state.newId);
    
  }

  render() {
    return (
      <div>
        {!this.state.edit.genres ? 
          (<li key={this.props.genre.id}>{this.props.genre.name}, id:{this.props.genre.id}
            <Button size="small" onClick={this.dropdownGenres}>Edit</Button>
            <Button size="small">Delete</Button>
          </li>) : 
          <select onChange={this.setNewGenre}>
            {this.props.reduxState.genres.map((genreItem) => 
              <option data={genreItem.id} key={genreItem.id}>{genreItem.name} : {genreItem.id}</option>
            )}
          </select>
        }
        <pre>{JSON.stringify(this.props.reduxState.genres)}</pre>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreListItem));