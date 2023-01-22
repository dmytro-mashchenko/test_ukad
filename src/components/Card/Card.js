import React from 'react';
import './Card.scss';
import PropTypes from 'prop-types';
import cn from 'class-names';

export function Card({ image, name, temperament, className, mode }) {
  const cardMode = cn({
    'Slider-format': mode === 'primary',
  });

  return (
    <div className={cn('Card', cardMode, className)}>
      <div className="Card__image-container">
        <img className="Card__image" src={image.url} alt="fine_dog" />
      </div>
      <div className="Card__info-container">
        <p className="Card__title">{name}</p>
        <p className="Card__describe">{temperament}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  temperament: PropTypes.string.isRequired,
  className: PropTypes.string,
  mode: PropTypes.oneOf(['default', 'primary']),
};
