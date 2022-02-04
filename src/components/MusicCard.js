import React from 'react';
import PropTypes from 'prop-types';

function MusicCard(props) {
  const { trackId, trackName, previewUrl } = props;
  return (
    <div key={ trackId }>
      <span>{trackName}</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        {`O seu navegador não suporta o elemento ${<code>audio</code>}.`}
      </audio>
    </div>
  );
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
