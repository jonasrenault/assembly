import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';

const width = 700;
const height = 700;
const rows = 12;
const arc = 180;
const dotsize = 4;
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
const dico = { "Extrême droite": { "couleur": "#7f6659", "long": "Extrême droite" }, "Gauche radicale": { "couleur": "#C84529", "long": "Gauche radicale" }, "LR-UDI-Divers droite": { "couleur": "#478cb2", "long": "Droite et centre" }, "LRM, Modem et app": { "couleur": "#e5c047", "long": "Majorité présidentielle" }, "PS, app et divers gauche": { "couleur": "#e4758f", "long": "Gauche socialiste" }, "Régionalistes": { "couleur": "#cccccc", "long": "Régionalistes" } };
const sexorder = {
  'F': 1,
  'M': 2
};
const margin = {
  top: 6,
  bottom: 20,
  left: 6,
  right: 20
};
const rainbow = false;

class ArcGraph extends Component {
  render() {
    const viewBox = [0, 0, width, height].join(' ');

    const m = this.props.data.slice().sort((a, b) => {
      return ordrepartis[a.etiquette_pandore] - ordrepartis[b.etiquette_pandore] || sexorder[a.sexe] - sexorder[b.sexe];
    });
    const seats = m.length;
    const widthMargin = margin.left + margin.right;
    const distanceScale = scaleLinear().domain([0, rows - 1]).range([(width) / 4 - widthMargin, width / 2 - widthMargin]);

    const angleScale = scaleLinear().domain([0, seats / rows - 1]).range([0, arc]);


    const circles = m.map((elt, idx) => {
      const layoutPosition = getLayoutPos(idx, seats);
      return (
        <circle
          key={elt.id}
          className={`${elt.etiquette_interieur} siege`}
          fill={dico[elt.etiquette_pandore].couleur}
          stroke='#FFF'
          r={dotsize}
          transform={`rotate(${angleScale(layoutPosition.column)}) translate(${distanceScale(layoutPosition.row)}, 0)`}
          ></circle>
        );
      });

      const arcG = <g transform={'translate(' + (width / 2) + ',' + (height - margin.bottom) + ') rotate(180)'}>
        {circles}
      </g>;
      return (
        <svg width={width} height={height} viewBox={viewBox}>
          {arcG}
        </svg>
      );
    }
  }

  function getLayoutPos(seat, seats) {
    const maxColumns = Math.ceil(seats / rows);
    let row = Math.floor(seat / maxColumns);
    let column = seat % maxColumns;
    if (!rainbow) {
      row = seat % rows;
      column = Math.floor(seat / rows);
      /* mon petit hack pas élégant pour caler le 577e député dans la dernière travée */
      if (column === 47) {
        row = (seat % rows) * .915
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

  export default ArcGraph;
