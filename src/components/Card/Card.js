import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import cn from "class-names";

import placeHolderImage from "../../assets/img/placeholder.jpg";

import "./Card.scss";

export function Card({ image, name, temperament, className, mode, id }) {
  const cardMode = cn({
    "Slider-format": mode === "slider",
  });

  return (
    <Link to={`/products/${id}`}>
      <div className={cn("Card", cardMode, className)}>
        <div className="Card__image-container">
          <img
            className="Card__image"
            src={image ? image.url : placeHolderImage}
            alt="fine_dog"
          />
        </div>
        <div className="Card__info-container">
          <h4 className="Card__sub-title">{name}</h4>
          <h3 className="Card__title">
            {temperament ? temperament : "This information is in progress"}
          </h3>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  name: PropTypes.string.isRequired,
  temperament: PropTypes.string,
  className: PropTypes.string,
  mode: PropTypes.oneOf(["default", "slider"]),
  id: PropTypes.number.isRequired,
};
