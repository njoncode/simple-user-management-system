import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loading state domain
 */

const selectLoadingDomain = state => state.loading || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Loading
 */

const makeSelectLoading = () =>
  createSelector(
    selectLoadingDomain,
    substate => substate,
  );

export default makeSelectLoading;
export { selectLoadingDomain };
