import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.scss';

export function ErrorMessage(props) {
  return (
    <div className="ErrorMessage">
      <p className="ErrorMessage__message">{props.message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
