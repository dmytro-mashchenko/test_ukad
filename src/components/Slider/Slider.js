import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import PropTypes from 'prop-types';

import { Card } from '../Card/Card';

import 'swiper/scss';
import 'swiper/scss/navigation';
import './Slider.scss';

export function Slider(props) {
  return (
    <Swiper
      className="Slider"
      modules={[Navigation]}
      spaceBetween={34}
      slidesPerView={3}
      slidesPerGroup={3}
      navigation
      breakpoints={{
        992: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 25,
        },
        480: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 15,
        },
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
    >
      {props.list.map((item) => (
        <SwiperSlide className="Slider__slide" key={item.id}>
          <Card mode="primary" {...item}></Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

Slider.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
};
