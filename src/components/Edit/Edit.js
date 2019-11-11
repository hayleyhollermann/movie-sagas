import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GenreList from '../GenreList/GenreList';
import { TextField, Input } from '@material-ui/core';



const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {

  state = {
    movieGenres: this.props.reduxState.movieGenres,
    movie: this.props.reduxState.movieInfo,
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
      ...this.state,
      movie:{
        ...this.state.movie,
        description: event.target.value
      }
    })  
  }

  editTitle = (event) => {
    this.setState({
        ...this.state,
        movie:{
          ...this.state.movie,
          title: event.target.value
        }
      }) 
  }

  render() {
    return (
      <div className="MovieDescription">
        <h1>Edit Info for {this.props.reduxState.movieInfo.title}</h1>
        <Input placeholder="title" fullWidth={true} value={this.state.movie.title} onChange={this.editTitle}/>
        <TextField placeholder="description" multiline={true} fullWidth={true} value={this.state.movie.description} onChange={this.editDescription}/>
        <GenreList movie={this.state.movie}/>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(Edit));