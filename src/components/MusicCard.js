import React from 'react';
import PropTypes from 'prop-types';
import './css/MusicCard.css';

function MusicCard(props) {
  const { trackId, trackName, isChecked, previewUrl, onFavoriteCheck } = props;
  return (
    <div className="song-data" key={ trackId }>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
      </audio>
      <label htmlFor={ trackId }>
        <input
          type="checkbox"
          name="favorite"
          id={ trackId }
          checked={ isChecked }
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ onFavoriteCheck }
        />
        Favorita
      </label>
    </div>
  );
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  previewUrl: PropTypes.string.isRequired,
  onFavoriteCheck: PropTypes.func.isRequired,
};

export default MusicCard;
