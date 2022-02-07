import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Card from '../components/Card';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './css/Search.css';

class Search extends React.Component {
  state = {
    artist: '',
    isButtonDisabled: true,
    loading: false,
    artistSearched: '',
    searchResults: [],
  }

  handleChange = ({ target }) => {
    const minLength = 2;
    this.setState({
      artist: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  }

  handleSubmit = (event) => {
    const { artist } = this.state;
    event.preventDefault();
    this.setState({ loading: true, artistSearched: artist }, async () => {
      const response = await searchAlbumsAPI(artist);
      this.setState({ artist: '', loading: false, searchResults: response });
    });
  }

  render() {
    const { artist, isButtonDisabled, loading,
      artistSearched, searchResults } = this.state;

    const { match } = this.props;
    const { path } = match;

    return (
      <div className="page-search" data-testid="page-search">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
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
                Pesquisar
              </button>
            </form>
          )}
        {(!loading && artistSearched && searchResults.length === 0) && (
          <div>
            <p>Nenhum álbum foi encontrado</p>
          </div>
        )}
        {(!loading && searchResults.length !== 0)
        && (
          <div>
            <p>{`Resultado de álbuns de: ${artistSearched}`}</p>
            <section className="search-results">
              {searchResults.map((album) => (
                <Card
                  key={ album.collectionId }
                  artistName={ album.artistName }
                  collectionName={ album.collectionName }
                  collectionId={ album.collectionId }
                />
              ))}
            </section>
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Search;
