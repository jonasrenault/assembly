import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Navbar, Overlay } from 'react-bootstrap';
import './App.css';
import deputeselus from './constants/deputeselus';
import Assembly from './Assembly/Assembly';
import DeputyInfo from './DeputyInfo/DeputyInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {deputy: null};
    this.handleSelectDeputy = this.handleSelectDeputy.bind(this);
  }

  handleSelectDeputy(deputy, event) {
    this.setState({deputy: deputy, target: event.target});
  }

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
          <Assembly data={deputeselus} onSelectDeputy={this.handleSelectDeputy} ref='assembly'/>
          <Overlay show={this.state.deputy !== null} target={this.state.target} container={() => ReactDOM.findDOMNode(this.refs.target)} placement='bottom'>
            <DeputyInfo deputy={this.state.deputy} />
          </Overlay>
        </Grid>
      </div>
    );
  }
}

export default App;
