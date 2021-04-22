/*
 *
 * Battle reducer
 *
 */
import produce from 'immer';
import { USERNAME_INPUT_REQUEST } from './constants';

export const initialState = {
  usernamesQueryData: {},
  // usernameInputLoading: false,
  // usernameInputError: false,
};

/* eslint-disable default-case, no-param-reassign */
const battleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USERNAME_INPUT_REQUEST:
        draft.usernamesQueryData = action.payload;
        break;
    }
  });

export default battleReducer;
