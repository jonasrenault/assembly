import React, { Component } from 'react';
import Seat from './Seat';

const ordrepartis = {
  'Gauche radicale': 1,
  'PS, app et divers gauche': 2,
  'LRM, Modem et app': 3,
  'LR-UDI-Divers droite': 4,
  'REM': 4.1,
  'MDM': 4.2,
  'Extrême droite': 6,
  'Régionalistes': .5
};
const sexorder = {
  'F': 1,
  'M': 2
};

class Assembly extends Component {
  render() {
    const viewBox = [0, 0, this.props.layout.width, this.props.layout.height].join(' ');
    const m = this.props.data.slice().sort((a, b) => {
      return ordrepartis[a.etiquette_pandore] - ordrepartis[b.etiquette_pandore] || sexorder[a.sexe] - sexorder[b.sexe];
    });
    const seats = m.length;

    const circles = m.map((elt, idx) => <Seat key={elt.id} seat={elt} idx={idx} seats={seats} layout={this.props.layout}></Seat>);

    return (
      <svg width={this.props.layout.width} height={this.props.layout.height} viewBox={viewBox}>
        <g transform={'translate(' + (this.props.layout.width / 2) + ',' + (this.props.layout.height - this.props.layout.margin.bottom) + ') rotate(180)'}>
          {circles}
        </g>
      </svg>
    );
  }
}

Assembly.defaultProps = {
  layout: {
    width: 700,
    height: 700,
    rows: 12,
    arc: 180,
    dotsize: 4,
    margin: {
      top: 6,
      bottom: 20,
      left: 6,
      right: 20
    },
    rainbow: false
  }
};

export default Assembly;
