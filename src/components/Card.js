import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './css/Card.css';

function Card(props) {
  const { artistName, collectionName, collectionId, albumImage } = props;

  return (
    <div className="album-card">
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ albumImage.replace('100x100', '500x500') } alt="Capa do Album" />
        <div className="album-info">
          <h3>{collectionName}</h3>
          <h4>{artistName}</h4>
        </div>
      </Link>
    </div>
  );
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  albumImage: PropTypes.string.isRequired,
};

export default Card;
