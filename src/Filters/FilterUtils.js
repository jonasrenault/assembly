import { cor, partis } from '../constants/constants';
import Fuse from 'fuse.js';

/**
 * Filter a list of deputies
 * @param  {Object} deputies  The list of deputies
 * @param  {Object} filters   The filter values
 * @return {Object} The list of deputies with each element marked as active or not
 */
export const filter = (deputies, filters, query, options = {}) => {
  return deputies.map(elt => {
    let active = true;
    if (filters.sexe && filters.sexe !== elt.sexe) {
      active = false;
    }
    if (filters.sortant) {
      active &= (filters.sortant === elt.sortant) || (filters.sortant !== 'Y' && elt.sortant !== 'Y');
    }
    if (filters.deja_ministre) {
      const condition = elt.deja_ministre.indexOf('inistre') !== -1 || elt.deja_ministre.indexOf('ecréataire') !== -1;
      active &= filters.deja_ministre === 'Y' ? condition : !condition;
    }
    if (filters.ena) {
      const condition = elt.ecoles.indexOf('ENA') !== -1;
      active &= filters.ena === 'Y' ? condition : !condition;
    }
    if (filters.age) {
      active &= elt.age < filters.age;
    }
    if (filters.prem_election_depute) {
      active &= elt.prem_election_depute > 0 && elt.prem_election_depute < filters.prem_election_depute;
    }
    if (query !== '') {
      const term = options.caseSensitive ? query : query.toLowerCase();
      const values = getDeputySearchValues(elt);
      active &= searchStrings(values, term, options);
    }
    elt.active = active;
    return elt;
  });
}

/**
 * Search a list of deputies
 * @param  {Object} deputies  The list of deputies
 * @param  {Object} query   The search query
 * @return {Object} The list of deputies with each element marked as active or not
 */
export const search = (deputies, query, options = {}) => {
  if (query === '') {
    return deputies;
  }
  const term = options.caseSensitive ? query : query.toLowerCase();
  return deputies.map(elt => {
    const values = getDeputySearchValues(elt);
    elt.active = searchStrings(values, term, options);
    return elt;
  })
}

export function searchStrings (strings, term, {caseSensitive, fuzzy, sortResults} = {}) {
  strings = strings.map(e => e.toString());

  try {
    if (fuzzy) {
      if (typeof strings.toJS === 'function') {
        strings = strings.toJS();
      }
      const fuse = new Fuse(
        strings.map(s => { return {id: s} }),
        { keys: ['id'], id: 'id', caseSensitive, shouldSort: sortResults }
      );
      return fuse.search(term).length;
    }
    return strings.some(value => {
      try {
        if (!caseSensitive) {
          value = value.toLowerCase();
        }
        if (value && value.search(term) !== -1) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    });
  } catch (e) {
    return false;
  }
}

export const getDeputySearchValues = (deputy) => {
  const circc = cor[deputy.circo.split("_")[0]].nom;
  const party = partis[deputy.etiquette_interieur];
  const name = deputy.prenom + " " + deputy.nom;
  return [circc, party.court, party.long, name, deputy.etiquette_interieur];
}
