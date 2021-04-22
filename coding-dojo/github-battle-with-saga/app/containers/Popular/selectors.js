import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the popular state domain
 */

const selectPopularDomain = state => state.popular || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Popular
 */

const makeSelectPopular = () =>
  createSelector(
    selectPopularDomain,
    substate => substate,
  );

const makeSelectPopularSelectedLanguage = () =>
  createSelector(
    selectPopularDomain,
    substate => substate.selectedLanguageToFetchData,
  );

const makeSelectPopularisFetchReposLoading = () =>
  createSelector(
    selectPopularDomain,
    substate => substate.isReposLoading,
  );

const makeSelectPopularFetchReposSuccessData = () =>
  createSelector(
    selectPopularDomain,
    substate => substate.repos,
  );

const makeSelectPopularIsFetchReposError = () =>
  createSelector(
    selectPopularDomain,
    substate => substate.isReposError,
  );

export default makeSelectPopular;

export {
  selectPopularDomain,
  makeSelectPopularSelectedLanguage,
  makeSelectPopularisFetchReposLoading,
  makeSelectPopularFetchReposSuccessData,
  makeSelectPopularIsFetchReposError,
};
