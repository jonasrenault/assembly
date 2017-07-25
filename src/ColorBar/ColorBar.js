import React, { PureComponent } from 'react';
import { scaleLinear } from 'd3-scale';
import { nest } from 'd3-collection';
import { dico, ordrepartis } from '../constants/constants';

class ColorBar extends PureComponent {

  render() {
    const {data, layout} = this.props;
    const nested = nest().key(elt => elt.active ? elt.etiquette_pandore : 'off').entries(data).sort((a, b) => a.key === 'off' ? 1 : ordrepartis[a.key] - ordrepartis[b.key]);
    const xScale = scaleLinear().domain([0, data.length]).range([0, layout.width]);
    let xSum = 0;
    const bars = nested.map(elt => {
      const width = xScale(elt.values.length);
      const x0 = xScale(xSum);
      xSum += elt.values.length;
      return (<g key={elt.key} fill={elt.key === 'off' ? '#CCC' : dico[elt.key].couleur}>
          <rect height={30} x={x0} y={0} width={width}></rect>
        </g>);
    })
    return (
      <svg width={layout.width}>
        <g transform='translate(0, 20)'>
          {bars}
        </g>
      </svg>
    );
  }
};

ColorBar.defaultProps = {
  layout: {
    width: 600
  }
};

export default ColorBar;
