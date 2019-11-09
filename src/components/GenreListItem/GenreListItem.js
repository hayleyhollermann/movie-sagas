import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        edit:{genres: !this.state.edit.genres}
    })
  }

  setNewGenre = () => {
      console.log('in setNewGenre');
      
  }

  render() {
    return (
      <div>
        {!this.state.edit.genres ? 
          (<li key={this.props.genre.name}>{this.props.genre.name}, id:{this.props.genre.id}
            <button onClick={this.dropdownGenres}>Edit</button>
            <button>Delete</button>
          </li>) : 
          <select>
            {this.props.reduxState.genres.map((genreItem) => 
              <option key={genreItem.id} onClick={() => this.setNewGenre(genreItem.id)}>{genreItem.name}</option>
            )}
          </select>
        }
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(GenreListItem));