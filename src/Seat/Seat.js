import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { dico } from '../constants/constants';


class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {hovered: false, seat: null};
    this.handleHover = this.handleHover.bind(this);
  }

  handleHover(hovered, seat, event) {
    this.setState({hovered, seat});
    if (hovered) {
      this.props.onSelectDeputy(seat, event);
    }
  }

  render() {
    const {seat, layout, idx, seats} = this.props;
    const widthMargin = layout.margin.left + layout.margin.right;
    const distanceScale = scaleLinear().domain([0, layout.rows - 1]).range([(layout.width) / 4 - widthMargin, layout.width / 2 - widthMargin]);
    const angleScale = scaleLinear().domain([0, seats / layout.rows - 1]).range([0, layout.arc]);
    const layoutPosition = getLayoutPos(idx, seats, layout);
    return (
      <circle
        className={`${seat.etiquette_interieur} siege`}
        fill={dico[seat.etiquette_pandore].couleur}
        stroke={this.state.hovered ? rgb(dico[seat.etiquette_pandore].couleur).darker(2) : '#FFF'}
        r={layout.dotsize}
        transform={`rotate(${angleScale(layoutPosition.column)}) translate(${distanceScale(layoutPosition.row)}, 0)`}
        onMouseEnter={(e) => this.handleHover(true, seat, e)}
        onMouseOut={(e) => this.handleHover(false, seat, e)}>
      </circle>
    );
  }
};

const getLayoutPos = (seat, seats, layout) => {
  const maxColumns = Math.ceil(seats / layout.rows);
  let row = Math.floor(seat / maxColumns);
  let column = seat % maxColumns;
  if (!layout.rainbow) {
    row = seat % layout.rows;
    column = Math.floor(seat / layout.rows);
    /* mon petit hack pas élégant pour caler le 577e député dans la dernière travée */
    if (column === 47) {
      row = (seat % layout.rows) * .915
    }
    if (column === 48) {
      row = 11
      column = 47
    }
  }
  return {
    row: row,
    column: column
  }
}

export default Seat;
