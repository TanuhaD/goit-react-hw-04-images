import React from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ id, img, onImageClick, alt }) {
  return (
    <div>
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={img}
          alt={alt}
          onClick={() => onImageClick(id)}
        />
      </li>
    </div>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
