import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';

class App extends React.Component {
  state = {
    loggedIn: false,
    // profileEdited: false,
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  }

  // handleProfileEdit = () => {
  //   this.setState({ profileEdited: true });
  // }

  render() {
    const { loggedIn } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (loggedIn ? <Redirect to="/search" />
              : <Login { ...props } onLogin={ this.handleLogin } />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          {/* <Route
            exact
            path="/profile/edit"
            render={ (props) => (profileEdited ? <Redirect to="/profile" />
              : <ProfileEdit { ...props } onEdit={ this.handleProfileEdit } />) }
          /> */}
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
