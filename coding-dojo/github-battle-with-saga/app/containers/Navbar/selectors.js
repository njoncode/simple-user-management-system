import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navbar state domain
 */

const selectNavbarDomain = state => state.navbar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Navbar
 */

const makeSelectNavbar = () =>
  createSelector(
    selectNavbarDomain,
    substate => substate,
  );

export default makeSelectNavbar;
export { selectNavbarDomain };
