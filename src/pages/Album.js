import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './css/Album.css';

class Album extends React.Component {
  state= {
    artist: '',
    album: '',
    image: '',
    loading: false,
    songs: [],
    favorites: [],
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this.setState({ loading: true },
      async () => {
        const albumResponse = await getMusics(id);
        const imageUrl = albumResponse[0].artworkUrl100
          ? albumResponse[0].artworkUrl100.replace('100x100', '500x500')
          : albumResponse[0].artworkUrl100;
        this.setState({ artist: albumResponse[0].artistName,
          album: albumResponse[0].collectionName,
          image: imageUrl,
          songs: albumResponse.filter((song) => song.kind === 'song') },
        async () => {
          const favoritesResponse = await getFavoriteSongs();
          this.setState({ loading: false, favorites: [...favoritesResponse] });
        });
      });
  }

  handleFavorite = ({ target }) => {
    const { songs } = this.state;
    const songObject = songs.find((song) => song.trackId === parseInt(target.id, 10));
    this.setState((prevState) => ({
      loading: true,
      favorites: target.checked ? [...prevState.favorites, songObject]
        : prevState.favorites
          .filter((favorite) => favorite.trackId !== parseInt(target.id, 10)),
    }), async () => {
      if (target.checked) {
        await addSong(songObject);
      } else {
        await removeSong(songObject);
      }
      this.setState({ loading: false });
    });
  }

  render() {
    const { artist, album, image, loading, songs, favorites } = this.state;

    const { match } = this.props;
    const { path } = match;

    return (
      <div className="page-album" data-testid="page-album">
        <Header activePage={ path } />
        {loading ? <Loading />
          : (
            <div className="album-container">
              <div className="album-data">
                <img src={ image } alt="Capa do Album" />
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
            </div>
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
