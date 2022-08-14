import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  ImgWrapper,
  Indicator,
  SlickWrapper,
} from './styles';
import { backUrl } from '../../config/config';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    initialSlide: 0,
    infinite: true,
    adaptiveHeight: true,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    beforeChange: (slide, newSlide) => setCurrentSlide(newSlide),
  };
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>Detailed Images</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <Slick {...settings}>
          {images.map((i) => (
            <ImgWrapper key={i.src}>
              <img src={`${backUrl}/${i.src}`} alt={i.src} />
            </ImgWrapper>
          ))}
        </Slick>
        <Indicator>
          <div>
            {currentSlide + 1} / {images.length}
          </div>
        </Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
