import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isButtonDisabled: true,
    loading: false,
  }

  handleChange = ({ target }) => {
    const minLength = 3;
    this.setState({
      name: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  }

  handleSubmit = (event) => {
    const { name } = this.state;
    const { onLogin } = this.props;
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      onLogin();
    });
  }

  render() {
    const { name, isButtonDisabled, loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form onSubmit={ this.handleSubmit }>
              <input
                type="text"
                name="name"
                placeholder="Digite seu nome"
                value={ name }
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
              <button
                type="submit"
                disabled={ isButtonDisabled }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
//   username: PropTypes.string.isRequired,
//   onInputChange: PropTypes.func.isRequired,
//   onLoginSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
