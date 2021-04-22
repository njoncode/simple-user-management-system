/*
 *
 * Results actions
 *
 */

import {
  RESULT_BATTLE_REQUEST,
  RESULT_BATTLE_SUCCESS,
  RESULT_BATTLE_FAILURE,
} from './constants';

export function resultBattleRequestAction(payload) {
  return {
    type: RESULT_BATTLE_REQUEST,
    payload,
  };
}

export function resultBattleSuccessAction(payload) {
  return {
    type: RESULT_BATTLE_SUCCESS,
    payload,
  };
}

export function resultBattleFailureAction() {
  return {
    type: RESULT_BATTLE_FAILURE,
  };
}
