/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../styles/containers/app.css';
import axios from 'axios';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { ThemeProvider } from '../contexts/theme';

import Navbar from '../Navbar';
import Popular from '../Popular';
import Battle from '../Battle';
import Results from '../Results';
import Loading from '../Loading/index';

export default function App() {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <Navbar toggleTheme={toggleTheme} />
          <Link to="/">Popular</Link>
          <Link to="/battle">Battle</Link>
          <pre />
          {/* <Loading text="Fetching" /> */}
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}
