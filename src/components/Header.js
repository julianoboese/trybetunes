import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
