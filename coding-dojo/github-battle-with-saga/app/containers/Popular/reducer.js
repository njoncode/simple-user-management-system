/*
 *
 * Popular reducer
 *
 */
import produce from 'immer';
import {
  FETCH_REPOS_REQUEST,
  SELECT_LANGUAGE_REQUEST,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from './constants';

export const initialState = {
  selectedLanguageToFetchData: 'All',
  repos: [],
  isReposLoading: true,
  isReposError: false,
};

/* eslint-disable default-case, no-param-reassign */
const popularReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SELECT_LANGUAGE_REQUEST:
        draft.selectedLanguageToFetchData = action.payload;
        break;
      case FETCH_REPOS_REQUEST:
        draft.isReposLoading = true;
        draft.isReposError = false;
        break;
      case FETCH_REPOS_SUCCESS:
        draft.repos = action.payload;
        draft.isReposLoading = false;
        draft.isReposError = false;
        break;
      case FETCH_REPOS_FAILURE:
        draft.isReposError = true;
        draft.isReposLoading = false;
        break;
    }
  });

export default popularReducer;
