/*
 *
 * Battle actions
 *
 */

import { USERNAME_INPUT_REQUEST } from './constants';

export function usernameInputRequestAction(payload) {
  return {
    type: USERNAME_INPUT_REQUEST,
    payload,
  };
}
