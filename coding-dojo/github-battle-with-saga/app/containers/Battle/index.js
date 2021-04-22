/**
 *
 * Battle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { usernameInputRequestAction } from './actions';

import BattleForm from '../../components/BattleForm';

export function Battle({ usernameInputRequestDispatch }) {
  useInjectReducer({ key: 'battle', reducer });
  useInjectSaga({ key: 'battle', saga });

  const usernameInputInitialState = {};

  const [player1, setPlayer1] = React.useState('');
  const [player2, setPlayer2] = React.useState('');

  const fetchUsernameInput = (state, action) => {
    if (action.type === 'ON_CHANGE') {
      console.log('action: ', action);
      return {
        ...state,
        [action.id]: action.value,
      };
    }
  };

  const [usernameInputState, dispatch] = React.useReducer(
    fetchUsernameInput,
    usernameInputInitialState,
  );

  const handleOnChange = event => {
    dispatch({
      type: 'ON_CHANGE',
      id: event.target.id,
      value: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    usernameInputRequestDispatch(usernameInputState);

    if (usernameInputState.username1) {
      setPlayer1(usernameInputState.username1);
    }
    if (usernameInputState.username2) {
      setPlayer2(usernameInputState.username2);
    }

    console.log(`Username1 is ${usernameInputState.username1}`);
    console.log(`Username2 is ${usernameInputState.username2}`);
    console.log(`Player1 is: ${player1}`);
    console.log(`Player2 is: ${player2}`);
  };

  return (
    <>
      <h2>Battle Players</h2>
      <BattleForm
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        usernameInputState={usernameInputState}
        player1={player1}
        player2={player2}
      />
    </>
  );
}

Battle.propTypes = {
  usernameInputRequestDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    usernameInputRequestDispatch: data =>
      dispatch(usernameInputRequestAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Battle);
