import React, { PureComponent } from 'react';
import Seat from '../Seat/Seat';
import { ordrepartis, sexorder } from '../constants/constants';

class Assembly extends PureComponent {
  render() {
    const viewBox = [0, 0, this.props.layout.width, this.props.layout.height].join(' ');
    const m = this.props.data.slice().sort((a, b) => {
      return ordrepartis[a.etiquette_pandore] - ordrepartis[b.etiquette_pandore] || sexorder[a.sexe] - sexorder[b.sexe];
    });
    const seats = m.length;

    const circles = m.map((elt, idx) => <Seat key={elt.id} seat={elt} idx={idx} seats={seats} layout={this.props.layout} onSelectDeputy={this.props.onSelectDeputy}></Seat>);

    return (
      <svg width={this.props.layout.width} viewBox={viewBox}>
        <g transform={'translate(' + (this.props.layout.width / 2) + ',' + (this.props.layout.height - this.props.layout.margin.bottom) + ') rotate(180)'}>
          {circles}
        </g>
      </svg>
    );
  }
}

Assembly.defaultProps = {
  layout: {
    width: 600,
    height: 333,
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
