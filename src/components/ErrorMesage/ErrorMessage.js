import React from 'react';

import './ErrorMessage.scss';

export function ErrorMessage() {
  return (
    <div className="ErrorMessage">
      <p className="ErrorMessage__message">
        Something went wrong, please try again later
      </p>
    </div>
  );
}
