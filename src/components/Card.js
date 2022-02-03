import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Card(props) {
  const { artistName, collectionName, collectionId } = props;

  return (
    <div>
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        {artistName}
        <hr />
        {collectionName}
      </Link>
    </div>
  );
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
