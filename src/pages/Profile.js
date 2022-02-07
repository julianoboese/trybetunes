import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
      <div data-testid="page-profile">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
            <>
              <img src={ image } alt="Foto de perfil" data-testid="profile-image" />
              <p>{name}</p>
              <p>{email}</p>
              <p>{description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </>
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
