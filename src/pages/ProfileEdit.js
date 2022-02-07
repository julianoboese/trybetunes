import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isButtonDisabled: true,
    loading: false,
    profileEdited: false,
  }

  componentDidMount() {
    this.setState({ loading: true },
      async () => {
        const userResponse = await getUser();
        const { name, email, description, image } = userResponse;
        this.setState({ loading: false,
          name,
          email,
          description,
          image,
          isButtonDisabled: !(name && email && description && image) });
      });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { name, email, description, image } = this.state;
      this.setState({ isButtonDisabled: !(name && email && description && image) });
    });
  }

  handleSubmit = (event) => {
    const { name, email, description, image } = this.state;
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      await updateUser({ name, email, description, image });
      this.setState({ profileEdited: true });
    });
  }

  render() {
    const { name, email, description, image, isButtonDisabled,
      loading, profileEdited } = this.state;

    const { match } = this.props;
    const { path } = match;

    if (profileEdited) {
      return <Redirect to="/profile" />;
    }

    return (
      <div data-testid="page-profile-edit">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
            <form onSubmit={ this.handleSubmit }>
              <label htmlFor="profile-image">
                <input
                  type="text"
                  name="image"
                  value={ image }
                  id="profile-image"
                  onChange={ this.handleChange }
                  data-testid="edit-input-image"
                />
              </label>
              <label htmlFor="profile-name">
                <input
                  type="text"
                  name="name"
                  value={ name }
                  id="profile-name"
                  onChange={ this.handleChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="profile-email">
                <input
                  type="email"
                  name="email"
                  value={ email }
                  id="profile-email"
                  onChange={ this.handleChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="profile-description">
                <textarea
                  name="description"
                  value={ description }
                  id="profile-description"
                  onChange={ this.handleChange }
                  data-testid="edit-input-description"
                />
              </label>
              <button
                type="submit"
                disabled={ isButtonDisabled }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileEdit;
