import React, { Component } from 'react';
import { Form, FormGroup, Radio, Glyphicon, ControlLabel, Col, FormControl} from 'react-bootstrap';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {sexe: '', age: '', prem_election_depute: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.props.onChange(name, value);
  }

  clearFilter(filter) {
    this.setState({
      [filter]: ''
    });
    this.props.onChange(filter, undefined);
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Sexe
          </Col>
          <Col sm={10}>
            <Radio name='sexe' value='M' checked={this.state.sexe === 'M'} onChange={this.handleChange} inline>
              Homme
            </Radio>
            {' '}
            <Radio name='sexe' value='F' checked={this.state.sexe === 'F'} onChange={this.handleChange} inline>
              Femme
            </Radio>
            {' '}
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('sexe')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Sortant
          </Col>
          <Col sm={10}>
            <Radio name='sortant' value='Y' checked={this.state.sortant === 'Y'} onChange={this.handleChange} inline>
              Oui
            </Radio>
            {' '}
            <Radio name='sortant' value='N' checked={this.state.sortant === 'N'} onChange={this.handleChange} inline>
              Non
            </Radio>
            {' '}
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('sortant')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Ancien Ministre
          </Col>
          <Col sm={10}>
            <Radio name='deja_ministre' value='Y' checked={this.state.deja_ministre === 'Y'} onChange={this.handleChange} inline>
              Oui
            </Radio>
            {' '}
            <Radio name='deja_ministre' value='N' checked={this.state.deja_ministre === 'N'} onChange={this.handleChange} inline>
              Non
            </Radio>
            {' '}
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('deja_ministre')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Enarque
          </Col>
          <Col sm={10}>
            <Radio name='ena' value='Y' checked={this.state.ena === 'Y'} onChange={this.handleChange} inline>
              Oui
            </Radio>
            {' '}
            <Radio name='ena' value='N' checked={this.state.ena === 'N'} onChange={this.handleChange} inline>
              Non
            </Radio>
            {' '}
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('ena')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Age &lt;
          </Col>
          <Col sm={6}>
            <FormControl type="number" name="age" placeholder="45" onChange={this.handleChange} value={this.state.age}/>
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('age')}/>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Député depuis
          </Col>
          <Col sm={6}>
            <FormControl type="number" name="prem_election_depute" min="1970" placeholder="1990" onChange={this.handleChange} value={this.state.prem_election_depute}/>
            <Glyphicon glyph="remove" onClick={() => this.clearFilter('prem_election_depute')}/>
          </Col>
        </FormGroup>
      </Form>
    )
  }
};

export default Filters;
