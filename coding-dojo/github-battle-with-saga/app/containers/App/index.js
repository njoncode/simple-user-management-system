/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import '../../styles/containers/app.css';
import axios from 'axios';

import GlobalStyle from '../../global-styles';

import { ThemeProvider } from '../contexts/theme';

import Navbar from '../../components/Navbar';
import Popular from '../Popular';
import Battle from '../Battle';
import Results from '../Results';

import '../../styles/components/Navbar.css';

const activeStyle = {
  color: 'rgb(187, 46, 31)',
};

export default function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme}>
      <ThemeProvider value={theme} />
      <Router>
        <div className="navbar">
          <div className={`popular-battle-nav ${theme}`}>
            <NavLink
              exact
              to="/"
              className={`nav-links ${theme}`}
              activeStyle={activeStyle}
            >
              Popular
            </NavLink>
            <NavLink
              to="/battle"
              className={`nav-links battle ${theme}`}
              activeStyle={activeStyle}
            >
              Battle
            </NavLink>
          </div>
          <Navbar toggleTheme={toggleTheme} className="theme-icon" />
        </div>
        <pre />
        {/* <Loading text="Fetching" /> */}
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/battle" component={Battle} />
          <Route path="/battle/results" component={Results} />
          <Route component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </div>
  );
}
