import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the battle state domain
 */

const selectBattleDomain = state => state.battle || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Battle
 */

const makeSelectBattle = () =>
  createSelector(
    selectBattleDomain,
    substate => substate,
  );

const makeSelectBattleUsernameInputRequestData = () =>
  createSelector(
    selectBattleDomain,
    substate => substate.usernamesQueryData,
  );

const makeSelectBattlePlayer1 = () =>
  createSelector(
    selectBattleDomain,
    substate => substate.player1,
  );

const makeSelectBattlePlayer2 = () =>
  createSelector(
    selectBattleDomain,
    substate => substate.player2,
  );

export default makeSelectBattle;

export {
  selectBattleDomain,
  makeSelectBattleUsernameInputRequestData,
  makeSelectBattlePlayer1,
  makeSelectBattlePlayer2,
};
