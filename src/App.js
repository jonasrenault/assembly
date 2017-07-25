import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Navbar, Overlay } from 'react-bootstrap';
import './App.css';
import deputeselus from './constants/deputeselus';
import Assembly from './Assembly/Assembly';
import DeputyInfo from './DeputyInfo/DeputyInfo';
import Filters from './Filters/Filters';

class App extends Component {
  constructor(props) {
    super(props);
    const deputies = deputeselus.map(elt => {
      elt.active = true;
      return elt;
    });
    this.filters = {};
    this.state = {deputy: null, deputies};
    this.handleSelectDeputy = this.handleSelectDeputy.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleSelectDeputy(deputy, selected, target) {
    this.setState(prevState => {
      const update = {target: target};
      if (selected) {
        update.deputy = deputy;
      } else if (prevState.deputy && prevState.deputy.id === deputy.id) {
        update.deputy = null;
      }
      return update;
    });
  }

  handleFilter(filter, value) {
    this.filters[filter] = value;
    this.filter();
  }

  filter() {
    const deputies = deputeselus.map(elt => {
      let active = true;
      if (this.filters.sexe && this.filters.sexe !== elt.sexe) {
        active = false;
      }
      if (this.filters.sortant) {
        active &= (this.filters.sortant === elt.sortant) || (this.filters.sortant !== 'Y' && elt.sortant !== 'Y');
      }
      if (this.filters.deja_ministre) {
        const condition = elt.deja_ministre.indexOf('inistre') !== -1 || elt.deja_ministre.indexOf('ecréataire') !== -1;
        active &= this.filters.deja_ministre === 'Y' ? condition : !condition;
      }
      if (this.filters.ena) {
        const condition = elt.ecoles.indexOf('ENA') !== -1;
        active &= this.filters.ena === 'Y' ? condition : !condition;
      }
      if (this.filters.age) {
        active &= elt.age < this.filters.age;
      }
      if (this.filters.prem_election_depute) {
        active &= elt.prem_election_depute > 0 && elt.prem_election_depute < this.filters.prem_election_depute;
      }
      elt.active = active;
      return elt;
    });
    this.setState({deputies});
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
          <Col md={7}>
            <Assembly data={this.state.deputies} onSelectDeputy={this.handleSelectDeputy} ref='assembly'/>
            <Overlay show={this.state.deputy !== null} target={this.state.target} container={() => ReactDOM.findDOMNode(this.refs.target)} placement='bottom'>
              <DeputyInfo deputy={this.state.deputy} />
            </Overlay>
          </Col>
          <Col md={5}>
            <Filters onChange={this.handleFilter}></Filters>
          </Col>
        </Grid>

      </div>
    );
  }
}

export default App;
