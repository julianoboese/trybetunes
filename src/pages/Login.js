import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import { ReactComponent as Logo } from '../assets/logo.svg';

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
      <div className="page-login" data-testid="page-login">
        <Logo />
        {loading ? <Loading />
          : (
            <section className="form-container">
              <form className="login-form" onSubmit={ this.handleSubmit }>
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
            </section>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
