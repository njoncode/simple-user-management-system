/**
 *
 * BattleForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

function Instructions() {
  return (
    <>
      <h1>Instructions</h1>
      <p>Enter two Github users</p>
      <p>Battle</p>
      <p>See the winner</p>
    </>
  );
}

function PlayersInput({
  label,
  handleOnChange,
  handleSubmit,
  usernameInputState,
  id,
}) {
  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor={label}>
          {label}
          <input
            type="username"
            placeholder="Github Username"
            id={id}
            value={usernameInputState}
            onChange={event => handleOnChange(event)}
            name="username"
          />
          <button disabled={!usernameInputState}>Submit</button>
        </label>
      </form>
    </>
  );
}

PlayersInput.propTypes = {
  label: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  usernameInputState: PropTypes.object,
  id: PropTypes.string.isRequired,
};

function BattleForm({
  handleOnChange,
  handleSubmit,
  usernameInputState,
  player1,
  player2,
}) {
  return (
    <>
      <Instructions />
      <h2>Players</h2>
      <PlayersInput
        label="Player One "
        id="username1"
        usernameInputState={usernameInputState.username1}
        handleOnChange={event => handleOnChange(event)}
        handleSubmit={handleSubmit}
      />
      <PlayersInput
        label="Player Two "
        id="username2"
        usernameInputState={usernameInputState.username2}
        handleOnChange={event => handleOnChange(event)}
        handleSubmit={handleSubmit}
      />

      {!!player1 && !!player2 && (
        <button>
          <Link
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${player1}&playerTwo=${player2}`,
              state: {
                player1,
                player2,
                // battleResult: JSON.parse(JSON.stringify(battleResult)),
              },
              // state: {
              //   fromNotifications: true,
              // },
            }}
          >
            Battle
          </Link>
        </button>
      )}
    </>
  );
}

BattleForm.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  usernameInputState: PropTypes.object.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
};

export default BattleForm;
