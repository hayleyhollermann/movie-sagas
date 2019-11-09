import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapReduxStateToProps = reduxState => ({
    reduxState
});

class Edit extends Component {



  render() {
    return (
      <div>
          <h2>Edit Movie Info!</h2>
      </div>
    );
  }
}


export default connect(mapReduxStateToProps)(withRouter(Edit));