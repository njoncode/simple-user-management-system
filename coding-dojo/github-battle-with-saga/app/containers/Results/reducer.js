/*
 *
 * Results reducer
 *
 */
import produce from 'immer';
import {
  RESULT_BATTLE_REQUEST,
  RESULT_BATTLE_SUCCESS,
  RESULT_BATTLE_FAILURE,
} from './constants';

export const initialState = {
  player1: '',
  player2: '',
  isResultBattleSuccess: false,
  resultBattleSuccessData: [],
  isResultBattleLoading: true,
  isResultBattleError: false,
  // errorMessage: '',
};

/* eslint-disable default-case, no-param-reassign */
const resultsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESULT_BATTLE_REQUEST:
        draft.player1 = action.payload.playerOne;
        draft.player2 = action.payload.playerTwo;
        break;
      case RESULT_BATTLE_SUCCESS:
        draft.isResultBattleSuccess = true;
        draft.resultBattleSuccessData = action.payload;
        draft.isResultBattleLoading = false;
        break;
      case RESULT_BATTLE_FAILURE:
        draft.isResultBattleError = true;
        draft.isResultBattleLoading = false;
        break;
    }
  });

export default resultsReducer;
