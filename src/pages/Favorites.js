import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './css/Favorites.css';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorites: [],
  }

  componentDidMount() {
    this.setState({ loading: true },
      async () => {
        const favoritesResponse = await getFavoriteSongs();
        this.setState({ loading: false, favorites: [...favoritesResponse] });
      });
  }

  handleUnfavorite = ({ target }) => {
    const { favorites } = this.state;
    const favoriteObject = favorites
      .find((favorite) => favorite.trackId === parseInt(target.id, 10));
    this.setState((prevState) => ({
      loading: true,
      favorites: prevState.favorites
        .filter((favorite) => favorite.trackId !== parseInt(target.id, 10)),
    }), async () => {
      await removeSong(favoriteObject);
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, favorites } = this.state;

    const { match } = this.props;
    const { path } = match;

    return (
      <div data-testid="page-favorites">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
            <section className="favorites">
              <p>Músicas favoritas:</p>
              {favorites.map((favorite) => (
                <MusicCard
                  key={ favorite.trackId }
                  trackId={ favorite.trackId }
                  trackName={ favorite.trackName }
                  isChecked
                  previewUrl={ favorite.previewUrl }
                  onFavoriteCheck={ this.handleUnfavorite }
                />
              ))}
            </section>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Favorites;
