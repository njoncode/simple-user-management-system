/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoading from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Loading({ text = 'Loading' }) {
  useInjectReducer({ key: 'loading', reducer });
  useInjectSaga({ key: 'loading', saga });

  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const interval = window.setInterval(
      () =>
        setContent(content =>
          content === `${text}...` ? text : `${content}.`,
        ),
      300,
    );
  }, []);

  // React.useEffect(() => {
  //   window.setInterval(() => {
  //     setContent(content => (content === `${text}...` ? text : `${content}.`));
  //   }, speed);

  //   // return () => window.clearInterval(interval);
  // }, [text, speed]);

  return <h2>{content}</h2>;
}

Loading.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Loading);
