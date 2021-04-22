import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the results state domain
 */

const selectResultsDomain = state => state.results || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Results
 */

const makeSelectResults = () =>
  createSelector(
    selectResultsDomain,
    substate => substate,
  );

const makeSelectResultPlayer1 = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.player1,
  );

const makeSelectResultPlayer2 = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.player2,
  );

const makeSelectResultBattleSuccess = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.isResultBattleSuccess,
  );

const makeSelectResultBattleSuccessData = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.resultBattleSuccessData,
  );

const makeSelectResultIsBattleLoading = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.isResultBattleLoading,
  );

const makeSelectResultBattleFailure = () =>
  createSelector(
    selectResultsDomain,
    substate => substate.isResultBattleError,
  );

export default makeSelectResults;

export {
  selectResultsDomain,
  makeSelectResultPlayer1,
  makeSelectResultPlayer2,
  makeSelectResultBattleSuccess,
  makeSelectResultBattleSuccessData,
  makeSelectResultBattleFailure,
  makeSelectResultIsBattleLoading,
};
