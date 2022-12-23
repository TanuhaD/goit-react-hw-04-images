import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import { IMAGES_PER_PAGE } from '../../utils/constants';
import fetchPictures from '../../utils/fetchAPI';
import Modal from '../Modal/Modal';
import Button from './Button/Button';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ query, notifyFunc }) => {
  const [imagesQuery, setImagesQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');
  const [captionData, setCaptionData] = useState('');

  useEffect(() => {
    setImagesQuery(query);
    setPage(1);
    setImages([]);
  }, [query]);

  useEffect(() => {
    if (!imagesQuery) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchPictures(imagesQuery, page);
      if (!data.hits.length) {
        notifyFunc('Nothing found for your request');
      }
      setImages(prev => [...prev, ...data.hits]);
      setTotalPages(Math.ceil(data.totalHits / IMAGES_PER_PAGE));
      setLoading(false);
    };
    fetchData();
  }, [notifyFunc, page, imagesQuery]);

  function nextPage() {
    setPage(p => p + 1);
  }

  const onImageClick = imageId => {
    const imgInfo = images.find(({ id }) => id === imageId);
    setIsModalShown(true);
    setModalImgUrl(imgInfo.largeImageURL);
    setCaptionData(imgInfo.tags);
  };

  return (
    <>
      {loading && (
        <Circles
          height="300"
          width="300"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass="spinner"
          visible={true}
        />
      )}

      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            img={image.webformatURL}
            onImageClick={onImageClick}
            alt={image.tags}
          />
        ))}
      </ul>
      {images.length > 0 && page !== totalPages && (
        <Button onClick={nextPage}>Load More</Button>
      )}
      {isModalShown && (
        <Modal onClose={() => setIsModalShown(false)}>
          <img
            src={modalImgUrl}
            alt={captionData}
            onLoad={({ currentTarget }) => {
              currentTarget.parentNode.classList.add('captionShow');
            }}
          />
          <p className="CaptionData">{captionData}</p>
        </Modal>
      )}
    </>
  );
};
ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  notifyFunc: PropTypes.func.isRequired,
};
export default ImageGallery;
