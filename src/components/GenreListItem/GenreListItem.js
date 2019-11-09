import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {

  state = {
    edit:{
        genres: false,
    }
  }

  dropdownGenres = () => {
    this.setState({
        edit:{genres: !this.state.edit.genres}
    })
  }

  render() {
    return (
      <div>
        {!this.state.edit.genres ? 
          (<li key={this.props.genre.name}>{this.props.genre.name}, id:{this.props.genre.id}
            <button onClick={this.dropdownGenres}>Edit</button>
            <button>Delete</button>
          </li>) : 
            <p>hello</p>
        }
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(Edit));