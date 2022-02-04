import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state= {
    artist: '',
    album: '',
    loading: false,
    songs: [],
    favorites: [],
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true }, async () => {
      const response = await getMusics(id);
      this.setState({ loading: false,
        artist: response[0].artistName,
        album: response[0].collectionName,
        songs: response.filter((song) => song.kind === 'song') });
    });
  }

  handleFavorite = ({ target }) => {
    const { songs } = this.state;
    const songObject = songs.find((song) => song.trackId === parseInt(target.id, 10));
    this.setState((prevState) => ({
      loading: true,
      favorites: [...prevState.favorites, songObject],
    }), async () => {
      await addSong(songObject);
      this.setState({ loading: false });
    });
  }

  render() {
    const { artist, album, loading, songs, favorites } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading />
          : (
            <>
              <div>
                <h1 data-testid="album-name">{album}</h1>
                <h2 data-testid="artist-name">{artist}</h2>
              </div>
              <section className="songs">
                {songs.map((song) => (
                  <MusicCard
                    key={ song.trackId }
                    trackId={ song.trackId }
                    trackName={ song.trackName }
                    isChecked={ favorites.some(
                      (favorite) => favorite.trackId === song.trackId,
                    ) }
                    previewUrl={ song.previewUrl }
                    onFavoriteCheck={ this.handleFavorite }
                  />
                ))}
              </section>
            </>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,

};

export default Album;
