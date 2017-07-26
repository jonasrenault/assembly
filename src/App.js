import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Col, Navbar, Overlay } from 'react-bootstrap';
import './App.css';
import deputeselus from './constants/deputeselus';
import Assembly from './Assembly/Assembly';
import DeputyInfo from './DeputyInfo/DeputyInfo';
import Filters from './Filters/Filters';
import { filter } from './Filters/FilterUtils';
// import ColorBar from './ColorBar/ColorBar';
import Search from './Search/Search';

class App extends Component {
  constructor(props) {
    super(props);
    const deputies = deputeselus.map(elt => {
      elt.active = true;
      return elt;
    });
    this.filters = {};
    this.searchQuery = '';
    this.state = {deputy: null, deputies};
    this.handleSelectDeputy = this.handleSelectDeputy.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleFilter(filterKey, value) {
    this.filters[filterKey] = value;
    this.setState({deputies: filter(deputeselus, this.filters, this.searchQuery)});
  }

  handleSearch(query) {
    this.searchQuery = query;
    this.setState({deputies: filter(deputeselus, this.filters, this.searchQuery)});
  }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="https://github.com/jonasrenault/assembly">French National Assembly</a>
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

            {/* <ColorBar data={this.state.deputies}/> */}
          </Col>
          <Col md={5}>
            <Search onChange={this.handleSearch}/>
            <Filters onChange={this.handleFilter}></Filters>
          </Col>
        </Grid>

      </div>
    );
  }
}

export default App;
