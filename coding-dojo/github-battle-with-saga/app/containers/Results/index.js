/**
 *
 * Results
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import queryString from 'query-string';
import {
  makeSelectResultBattleSuccessData,
  makeSelectResultIsBattleLoading,
  makeSelectResultBattleFailure,
} from './selectors';
import { resultBattleRequestAction } from './actions';
import reducer from './reducer';
import saga from './saga';

import ResultsForm from '../../components/ResultsForm';
import Loading from '../Loading';

function Results({
  location,
  resultBattleRequestDispatch,
  resultBattle,
  isResultBattleLoading,
  isResultBattleError,
}) {
  useInjectReducer({ key: 'results', reducer });
  useInjectSaga({ key: 'results', saga });

  console.log(`location.search Output: ${location.search}`);

  const { playerOne, playerTwo } = queryString.parse(location.search);

  console.log(
    'queryString.parse(location.search) Output: ',
    queryString.parse(location.search),
  );

  const locationState = location.state;

  console.log('Location is: ', location);
  console.log('Location State is: ', locationState);

  // console.log('player1 passed via data is: ', locationState.player1);
  // console.log('player2 passed via data is: ', locationState.player2);

  React.useEffect(() => {
    resultBattleRequestDispatch({
      playerOne,
      playerTwo,
    });
    console.log('useEffect Exceuted!');
    console.log(`Player One is: ${playerOne}`);
    console.log(`Player Two is: ${playerTwo}`);
  }, []);

  console.log('Result Battle Data: ', resultBattle);

  /**
   * 
   * The below data will be undefined unless api is successfully called. So we assign the data to the variables (in return segment) when loading is false.
   
   * const winnerData = resultBattle[0].profile;  
     const loserData = resultBattle[1].profile.data;
     const winnerScore = resultBattle[0].score;
    const loserScore = resultBattle[1].score;

   */

  if (isResultBattleLoading) {
    return <Loading text="Battling" />;
  }

  if (isResultBattleError) {
    return <p>Error: There has been some error in fetching battle results.</p>;
  }

  return (
    <>
      <h1>Battle Result</h1>
      <ResultsForm
        scorePlayerOne={resultBattle[0].score}
        scorePlayerTwo={resultBattle[1].score}
        winner={resultBattle[0].profile.data}
        loser={resultBattle[1].profile.data}
      />
    </>
  );
}

Results.propTypes = {
  location: PropTypes.object.isRequired,
  resultBattleRequestDispatch: PropTypes.func.isRequired,
  resultBattle: PropTypes.array.isRequired,
  isResultBattleLoading: PropTypes.bool,
  isResultBattleError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  resultBattle: makeSelectResultBattleSuccessData(),
  isResultBattleLoading: makeSelectResultIsBattleLoading(),
  isResultBattleError: makeSelectResultBattleFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    resultBattleRequestDispatch: data =>
      dispatch(resultBattleRequestAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Results);
