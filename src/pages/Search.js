import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    isButtonDisabled: true,
  }

  handleChange = ({ target }) => {
    const minLength = 2;
    this.setState({
      artist: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  }

  render() {
    const { artist, isButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="artist"
            placeholder="Digite o nome do artista"
            value={ artist }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            type="submit"
            disabled={ isButtonDisabled }
            data-testid="search-artist-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
