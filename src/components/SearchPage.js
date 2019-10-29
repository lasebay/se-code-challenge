/**
 * Allows to search and load a specific comic
 */
import React, { Component } from 'react';
import { Container, Input, Typography } from '@material-ui/core';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      comic: {},
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    const { endpoint } = this.props;
    const { value } = this.state;
    let url = endpoint.concat('=').concat(value);
    fetch(url)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            comic: data
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const { error, value, comic } = this.state;
    // let errorMessage = '';
    // if (error) {
    //   errorMessage = 'Error: ' + error.message;
    // }
    let invalidInputMessage = '';
    if (value !== '') {
      if (isNaN(value) || value < 1 || value > 2219) {
        invalidInputMessage = 'Invalid input. Enter a number between 1-2219.';
      }
    }

    return (
      <Container>
        <Container>
          <Input
            className="searchInput"
            type="text"
            value={value}
            onChange={event => {
              this.setState({ value: event.target.value });
            }}
          />
          <Input
            className="searchSubmit"
            type="submit"
            onClick={this.handleSubmit}
          />
          <Typography style={{ color: 'red' }}>
            {invalidInputMessage}
          </Typography>
        </Container>
        <br />
        <img
          className="searchImage"
          src={comic.img}
          alt={comic.title}
          title={comic.alt}
        />

        {/* {error ? (
          errorMessage
        ) : (
          <img
            className="searchImage"
            src={comic.img}
            alt={comic.title}
            title={comic.alt}
          />
        )} */}
      </Container>
    );
  }
}

export default SearchPage;
