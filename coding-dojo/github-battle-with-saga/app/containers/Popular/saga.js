import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import { fetchPopularRepos } from '../../utils/api';
import { FETCH_REPOS_REQUEST } from './constants';
import { makeSelectPopularSelectedLanguage } from './selectors';
import { fetchReposSuccessAction, fetchReposFailureAction } from './actions';

function* popularSagaRequest() {
  const selectedLanguage = yield select(makeSelectPopularSelectedLanguage());
  console.log('Saga Executed! selectedLanguage: ', selectedLanguage);

  try {
    const response = yield call(fetchPopularRepos, selectedLanguage);
    console.log('API Call Response: ', response);

    if (response.statusText === 'OK') {
      console.log('API Successfully hit');
      yield put(fetchReposSuccessAction(response.data.items));
      console.log('API Call Success: Data Items: ', response.data.items);
    } else {
      console.log('API Call Error');
      yield put(fetchReposFailureAction());
    }
  } catch (error) {
    console.log('API Call (Caught Error): ', error);
    yield put(fetchReposFailureAction());
  }
}

// Individual exports for testing
export default function* popularSaga() {
  yield takeLatest(FETCH_REPOS_REQUEST, popularSagaRequest);
}
