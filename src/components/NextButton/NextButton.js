import React from 'react';
import arrow from '../../assets/img/Arrow.png';

import './NextButton.scss';

export function NextButton() {
  return (
    <div className="NextButton next">
      <div className="NextButton__ellips">
        <img className="NextButton__icon" src={arrow} alt="arrow" />
      </div>
    </div>
  );
}
