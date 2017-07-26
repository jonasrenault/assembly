/**
 * Filter a list of deputies
 * @param  {Object} deputies  The list of deputies
 * @param  {Object} filters   The filter values
 * @return {Object} The list of deputies with each element marked as active or not
 */
export const filter = (deputies, filters) => {
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
    elt.active = active;
    return elt;
  });
}
