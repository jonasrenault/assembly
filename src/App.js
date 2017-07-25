import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import './App.css';
import deputeselus from './deputeselus';
import Assembly from './Assembly';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">French National Assembly</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid className="main">
          <Assembly data={deputeselus}/>
        </Grid>
      </div>
    );
  }
}

export default App;
