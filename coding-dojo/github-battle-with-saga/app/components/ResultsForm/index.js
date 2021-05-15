/**
 *
 * ResultsForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Loading from '../../containers/Loading';

import '../../styles/components/result.css';

function ResultsForm({ scorePlayerOne, scorePlayerTwo, winner, loser }) {
  return (
    <>
      <div className="container">
        <div className="grid-result">
          <div>
            {scorePlayerOne === scorePlayerTwo ? <h2>Tie</h2> : <h2>Winner</h2>}
            <img src={winner.avatar_url} alt={`${winner.name} avatar`} />
            <h2>Score: {scorePlayerOne.toLocaleString()}</h2>
            <a href={winner.html_url} className="html-url">
              {winner.login}{' '}
            </a>
            <p>{winner.name}</p>
            <p>{winner.location}</p>
            <p>{winner.company}</p>
            <p>{winner.followers} followers</p>
            <p>{winner.following} following</p>
            <p>{winner.public_repos} repositories</p>
          </div>

          <div>
            {scorePlayerOne === scorePlayerTwo ? <h2>Tie</h2> : <h2>Loser</h2>}
            <img src={loser.avatar_url} alt={`${loser.name} avatar`} />
            <h2>{`Score: ${scorePlayerTwo.toLocaleString()}`}</h2>
            <a href={loser.html_url} className="html-url">
              {loser.login}{' '}
            </a>
            <p>{loser.name}</p>
            <p>{loser.location}</p>
            <p>{loser.company}</p>
            <p>{loser.followers} followers</p>
            <p>{loser.following} following</p>
            <p>{loser.public_repos} repositories</p>
          </div>
        </div>

        <br />
        <button
          onClick={() => (window.location.href = '/battle')}
          className="btn-reset"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default ResultsForm;

ResultsForm.propTypes = {
  scorePlayerOne: PropTypes.number.isRequired,
  scorePlayerTwo: PropTypes.number.isRequired,
  winner: PropTypes.object.isRequired,
  loser: PropTypes.object.isRequired,
};
