import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, Button, Typography } from '@material-ui/core/';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      endpoint: 'https://xkcd.now.sh/?comic',
      comic: {}
    };
  }

  componentDidMount() {
    const endpoint = this.state.endpoint;
    let latest = endpoint.concat('=latest');
    fetch(latest)
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
  }

  render() {
    const { error, isLoaded, comic, endpoint } = this.state;
    if (error) {
      return <Container>Error: {error.message}</Container>;
    } else if (!isLoaded) {
      return <Typography>Loading...</Typography>;
    } else {
      return (
        <Router>
          <Container style={{ margin: 20 }}>
            <nav>
              <Link to="/">
                <Button className="latest">Latest</Button>
              </Link>
              <Link to="/search">
                <Button className="search">Search</Button>
              </Link>
            </nav>
          </Container>

          <Container>
            <Switch>
              <Route exact path="/">
                <HomePage comic={comic} />
              </Route>
              <Route path="/search">
                <SearchPage endpoint={endpoint} />
              </Route>
            </Switch>
          </Container>
        </Router>
      );
    }
  }
}

export default App;
