/**
 * Displays the latest comic upon load
 */
import React, { Component } from 'react';
import { Container } from '@material-ui/core';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comic } = this.props;
    return (
      <Container>
        <img
          className="latestImage"
          src={comic.img}
          alt={comic.title}
          title={comic.alt}
        ></img>
      </Container>
    );
  }
}

export default HomePage;
