/**
 *
 * BattleForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FaUserFriends, FaBattleNet, FaTrophy } from 'react-icons/fa';
import '../../styles/components/battleForm.css';

import ThemeContext from '../../containers/contexts/theme';

// import styled from 'styled-components';

function Instructions() {
  return (
    <>
      <p className="instr">Instructions</p>

      <div className="battle-instructions">
        <div className="icons-container">
          <p className="icon-header">Enter two Github users</p>
          <FaUserFriends
            size="180px"
            color="rgb(238, 182, 78)"
            style={{
              background: 'rgb(226, 221, 221)',
              padding: '40px',
            }}
          />
        </div>

        <div className="icons-container">
          <p>Battle</p>
          <FaBattleNet
            size="180px"
            color="grey"
            style={{
              background: 'rgb(226, 221, 221)',
              padding: '40px',
            }}
          />
        </div>

        <div className="icons-container">
          <p>See the winner</p>
          <FaTrophy
            size="180px"
            color="rgba(247, 247, 47, 0.952)"
            style={{
              background: 'rgb(226, 221, 221)',
              padding: '40px',
            }}
          />
        </div>
      </div>
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
  const theme = React.useContext(ThemeContext);

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor={label}>
          {label}
          <br />
          <input
            className="input-text"
            type="username"
            placeholder="Github Username"
            id={id}
            value={usernameInputState}
            onChange={event => handleOnChange(event)}
            name="username"
          />
          <button
            className="btn-submit"
            // className={`btn-submit ${theme}`}
            disabled={!usernameInputState}
          >
            Submit
          </button>
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
  const theme = React.useContext(ThemeContext);

  return (
    <>
      <Instructions />
      <p className="players">Players</p>
      <div className="players-input">
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
        <br />
      </div>

      {!!player1 && !!player2 && (
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
          <button className="btn-submit btn-battle">Battle</button>
          {/* className={`btn-submit btn-battle ${theme}`} */}
        </Link>
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
