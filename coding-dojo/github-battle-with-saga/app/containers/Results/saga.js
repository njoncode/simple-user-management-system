import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { battlePlayers } from '../../utils/api';

import { RESULT_BATTLE_REQUEST } from './constants';
import { makeSelectResultPlayer1, makeSelectResultPlayer2 } from './selectors';
import {
  resultBattleSuccessAction,
  resultBattleFailureAction,
} from './actions';

function* resultsSagaRequest() {
  const playerOne = yield select(makeSelectResultPlayer1());
  const playerTwo = yield select(makeSelectResultPlayer2());

  console.log('Saga - playerOne is:', playerOne);
  console.log('Saga - playerTwo is:', playerTwo);

  try {
    const response = yield call(battlePlayers, playerOne, playerTwo);

    console.log('API Call Response: ', response);

    if (
      response[0].profile.statusText === 'OK' &&
      response[1].profile.statusText === 'OK'
    ) {
      console.log('API Successfully hit');

      yield put(resultBattleSuccessAction(response));
      console.log(
        'battleResultSuccessAction call result: ',
        yield put(resultBattleSuccessAction(response)),
      );
      // yield put(push('/battle/results'));
    } else {
      console.log('Error in fetching data');
      // yield put(resultBattleFailureAction());
    }
  } catch (error) {
    console.error(`Error in API Call: ${error}`);
    yield put(resultBattleFailureAction());
  }
}

export default function* resultsSaga() {
  // Individual exports for testing
  yield takeLatest(RESULT_BATTLE_REQUEST, resultsSagaRequest);
}
