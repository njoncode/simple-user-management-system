/**
 *
 * Popular
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import '../../styles/containers/popular.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import {
  makeSelectPopularSelectedLanguage,
  makeSelectPopularisFetchReposLoading,
  makeSelectPopularFetchReposSuccessData,
  makeSelectPopularIsFetchReposError,
} from './selectors';
import {
  selectLanguageToFetchDataAction,
  fetchReposRequestAction,
} from './actions';

import Loading from '../Loading';
import PopularPage from '../../components/PopularPage';

export function Popular({
  selectLanguageToFetchDataRequestDispatch,
  selectedLanguage,
  fetchReposRequestDispatch,
  repos,
  isLoading,
  isError,
}) {
  useInjectReducer({ key: 'popular', reducer });
  useInjectSaga({ key: 'popular', saga });

  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  React.useEffect(() => {
    console.log('UseEffect executed!');

    fetchReposRequestDispatch(selectedLanguage);
  }, [selectedLanguage]);

  const handleClick = lang => {
    console.log('CLICKED ON LANGUAGE BUTTON: ', lang);

    selectLanguageToFetchDataRequestDispatch(lang);

    // fetchReposRequestDispatch(selectedLanguage);
  };

  console.log('OnClick Selected Language is:', selectedLanguage);

  // const handleSelectLanguage = (
  //   state = selectedLanguageInitialState,
  //   action,
  // ) => {
  //   console.log('Button Clicked! handleSelectLanguage Executed');
  //   if (action.type === 'ON_CLICKING_LANGUAGE_BUTTON') {
  //     return {
  //       ...state,
  //       selectedLanguage: action.selectedLanguage,
  //     };
  //   }
  // };

  console.log('repos: ', repos);

  return (
    <>
      <ul>
        {languages.map(language => (
          <li key={language}>
            <button
              style={language === selectedLanguage ? { color: 'red' } : null}
              onClick={() => handleClick(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>

      {!!isLoading && <Loading text="Fetching Repositories" />}

      {!!isError && <h2>Error in Fetching Repositories.</h2>}

      {!isLoading && !isError && <PopularPage repos={repos} />}
    </>
  );
}

Popular.propTypes = {
  selectLanguageToFetchDataRequestDispatch: PropTypes.func.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
  fetchReposRequestDispatch: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedLanguage: makeSelectPopularSelectedLanguage(),
  repos: makeSelectPopularFetchReposSuccessData(),
  isLoading: makeSelectPopularisFetchReposLoading(),
  isError: makeSelectPopularIsFetchReposError(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectLanguageToFetchDataRequestDispatch: data =>
      dispatch(selectLanguageToFetchDataAction(data)),
    fetchReposRequestDispatch: data => dispatch(fetchReposRequestAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Popular);
