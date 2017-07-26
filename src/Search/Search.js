import React, { Component } from 'react';
import { FormGroup, Glyphicon, FormControl} from 'react-bootstrap';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
    this.props.onChange(event.target.value);
  }

  clearSearch() {
    this.setState({
      search : ''
    });
    this.props.onChange('');
  }

  render() {
    return (
      <form className='filters-form'>
        <FormGroup className={this.state.search ? 'has-feedback' : ''}>
          <FormControl
            type="text"
            value={this.state.search}
            placeholder="Rechercher un député..."
            onChange={this.handleChange}
          />
          {this.state.search &&
            <Glyphicon glyph="remove" style={{pointerEvents: 'auto', cursor: 'pointer', color: '#999'}} className="form-control-feedback" onClick={this.clearSearch}/>}
        </FormGroup>
      </form>
    )
  }
};

export default Search;
