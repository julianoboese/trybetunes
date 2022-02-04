import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state= {
    artist: '',
    album: '',
    loading: false,
    songs: [],
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

  render() {
    const { artist, album, loading, songs } = this.state;

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
                    previewUrl={ song.previewUrl }
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
