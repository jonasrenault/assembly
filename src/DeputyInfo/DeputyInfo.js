import React, { Component } from 'react';
import {cor, dico, partis, mandats } from '../constants/constants';
import './DeputyInfo.css';

class DeputyInfo extends Component {
  render() {
    const deputy = this.props.deputy;
    if (!deputy) {
      return null;
    }
    const genre = deputy.sexe === 'F' ? 'e' : '';
    const circ = deputy.circo.split('_')[1];
    const dep = deputy.circo.split('_')[0];
    let ecole;
    if (deputy.ecoles) {
      let article;
      if (deputy.ecoles.split(' | ')[0] === 'Université') {
        article = 'à l\'';
      } else if (deputy.ecoles.split(' | ')[0].slice(0, 5) === 'Ecole') {
        article = 'en ';
      } else if (deputy.ecoles.split(' | ')[0].slice(0, 5) === 'Scien') {
        article = 'à ';
      } else if (deputy.ecoles.split(' | ')[0].slice(0, 5) === 'Etude') {
        article = '';
      } else if (deputy.ecoles.split(' | ')[0] === 'BTS') {
        article = 'en '
      } else {
        article = 'à l\'';
      }
      const ecoles = deputy.ecoles.replace(/ \| /g, ", ").replace("Université", "université").replace("Ecole", "école").replace("Etudes", "études").replace("Droit", "en droit");
      ecole = `a été formé${genre} ${article} ${ecoles}`;
    }
    const mandatactuel = [];
    const mandatancien = [];
    ["mandat_municipal", "mandat_dep", "mandat_reg_ou_territorial", "mandat_parlementaire"].forEach(elt => {
      if (deputy[elt].indexOf('Ancien') > -1) {
        mandatancien.push(mandats[elt][deputy[elt]][deputy.sexe]);
      } else if (deputy[elt] !== 'N' && deputy[elt] !== '') {
        mandatactuel.push(mandats[elt][deputy[elt]][deputy.sexe]);
      }
    });
    return (
      <div className='deputy-info' style={{...this.props.style}}>
        <div
          style={{borderLeft: `6px solid ${dico[deputy.etiquette_pandore].couleur}`}}
          className='bordered-left'>
          <div className='title'>
            Député{genre} {deputy.prenom + ' ' + deputy.nom.toUpperCase()}
          </div>
          <div>
            {circ}<sup>{circ === 1 ? 're': 'e'}</sup> circonscription {cor[dep].nom}
          </div>
          <div>
            {dico[deputy.etiquette_pandore].long}
          </div>
          <div>
            Parti : {partis[deputy.etiquette_interieur].long}
          </div>
        </div>
        <div className="hr"></div>
        <p>est né{genre} en {deputy.date_de_naissance.substring(6)} ({deputy.age} ans)</p>
        {ecole && <p>{ecole}</p>}
        {deputy.deja_candidat === 'N' && <p>n'avait jamais été candidate{genre} à une éléction</p>}
        {deputy.prem_election_depute > 0 && <p>élu{genre} pour la première fois en {deputy.prem_election_depute} ({deputy.nbr_mandats_deputes + 1} <sup>e</sup> mandat en juin 2017)</p>}
        {mandatactuel.length > 0 && mandatancien.length > 0 && <div className="hr"></div>}
        {mandatactuel.length > 0 && <p>Mandat{mandatactuel.length > 0 ? 's' : ''} au moment de l'élection : {mandatactuel.join(', ')}</p>}
        {mandatancien.length > 0 && <p>Mandat{mandatancien.length > 0 ? 's' : ''} passé{mandatancien.length > 0 ? 's' : ''} : {mandatancien.join(', ')}</p>}
      </div>

    );
  }
};


export default DeputyInfo;
