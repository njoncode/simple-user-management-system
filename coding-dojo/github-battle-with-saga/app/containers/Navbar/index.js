/**
 *
 * Navbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import '../../styles/containers/theme.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNavbar from './selectors';
import reducer from './reducer';
import saga from './saga';

import ThemeContext from '../contexts/theme';

export function Navbar({ toggleTheme }) {
  useInjectReducer({ key: 'navbar', reducer });
  useInjectSaga({ key: 'navbar', saga });

  const theme = React.useContext(ThemeContext);

  return (
    <button className="btn-clear" onClick={toggleTheme}>
      {theme === 'light' ? '🔦' : '💡'}
    </button>
  );
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navbar: makeSelectNavbar(),
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

export default compose(withConnect)(Navbar);
