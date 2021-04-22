/*
 *
 * Popular actions
 *
 */

import {
  SELECT_LANGUAGE_REQUEST,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from './constants';

export function selectLanguageToFetchDataAction(payload) {
  return {
    type: SELECT_LANGUAGE_REQUEST,
    payload,
  };
}

export function fetchReposRequestAction() {
  return {
    type: FETCH_REPOS_REQUEST,
  };
}

export function fetchReposSuccessAction(payload) {
  return {
    type: FETCH_REPOS_SUCCESS,
    payload,
  };
}

export function fetchReposFailureAction() {
  return {
    type: FETCH_REPOS_FAILURE,
  };
}
