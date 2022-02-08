import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './css/Profile.css';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  }

  componentDidMount() {
    this.setState({ loading: true },
      async () => {
        const userResponse = await getUser();
        const { name, email, description, image } = userResponse;
        this.setState({ loading: false, name, email, description, image });
      });
  }

  render() {
    const { name, email, description, image, loading } = this.state;

    const { match } = this.props;
    const { path } = match;

    return (
      <div className="page-profile" data-testid="page-profile">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
            <section className="profile-container">
              <img
                src={ image || '/standard-profile.svg' }
                alt="Foto de perfil"
                data-testid="profile-image"
              />
              <div className="profile-item">
                <h3>Nome</h3>
                <p>{name}</p>
              </div>
              <div className="profile-item">
                <h3>E-mail</h3>
                <p>{email}</p>
              </div>
              <div className="profile-item">
                <h3>Descrição</h3>
                <p>{description}</p>
              </div>
              <Link to="/profile/edit">Editar perfil</Link>
            </section>
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
