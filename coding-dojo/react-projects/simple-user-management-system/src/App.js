import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';


import Users from './components/Users';
import UserDetails from './components/UserDetails';
import CreateUserPage from './components/CreateUserPage';
import UserEditPage from './components/UserEditPage';

function App() {
  return (
    <>
    <ToastProvider style={{ zIndex: '9999999' }}>
    <Router>
      <Switch>
        <Route exact path='/' component={Users} />
        <Route exact path='/users' component={Users} />
        <Route exact path='/user/:id' component={UserDetails} />
        <Route exact path='/add-user' component={CreateUserPage} />
        <Route path='/user/edit/:id' component={UserEditPage} />
      </Switch>
    </Router >
    </ToastProvider>
    </>
  );
}

export default App;
