import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: '',
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const loggedUser = await getUser();
      this.setState({ name: loggedUser.name },
        () => this.setState({ loading: false }));
    });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <span data-testid="header-user-name">{name}</span>}
      </header>
    );
  }
}

export default Header;
