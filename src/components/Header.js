import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { ReactComponent as Logo } from '../assets/logo-header.svg';
import './css/Header.css';

class Header extends Component {
  state = {
    name: '',
    loading: false,
    activePage: '',
  }

  async componentDidMount() {
    const { activePage } = this.props;
    this.setState({ loading: true }, async () => {
      const loggedUser = await getUser();
      this.setState({ name: loggedUser.name },
        () => this.setState({ loading: false, activePage }));
    });
  }

  render() {
    const { name, loading, activePage } = this.state;
    const activePageClass = 'active-page';

    return (
      <header data-testid="header-component">
        {loading ? <Loading />
          : (
            <>
              <section className="logo-user">
                <Logo />
                <div className="username">
                  <span data-testid="header-user-name">{name}</span>
                </div>
              </section>
              <section className="pages">
                <div
                  className={ `page-link
                  ${(activePage === '/search' || activePage.includes('album'))
                && activePageClass}` }
                >
                  <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
                </div>
                <div
                  className={ `page-link middle-page ${activePage === '/favorites'
                && activePageClass}` }
                >
                  <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                </div>
                <div
                  className={ `page-link ${activePage.includes('/profile')
                && activePageClass}` }
                >
                  <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                </div>
              </section>
            </>
          )}
      </header>
    );
  }
}

Header.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default Header;
