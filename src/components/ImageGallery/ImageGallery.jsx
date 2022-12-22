import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import fetchPictures from '../../utils/fetchAPI';
import { Circles } from 'react-loader-spinner';
import Modal from '../Modal/Modal';
import { IMAGES_PER_PAGE } from '../../utils/constants';
import Button from './Button/Button';
import throttle from 'lodash.throttle';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    notifyFunc: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    page: 1,
    loading: false,
    totalPages: 1,
    isModalShown: false,
    modalImgUrl: '',
    captionData: '',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.throttledScrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({ loading: true });
      const data = await fetchPictures(this.props.query, 1);
      if (!data.hits.length) {
        this.props.notifyFunc('Nothing found for your request');
      }
      this.setState({
        images: [...data.hits],
        page: 1,
        loading: false,
        totalPages: Math.ceil(data.totalHits / IMAGES_PER_PAGE),
      });
    } else if (this.state.page !== prevState.page && this.state.page > 1) {
      this.setState({ loading: true });
      const data = await fetchPictures(this.props.query, this.state.page);
      this.setState({
        images: [...prevState.images, ...data.hits],
        loading: false,
      });
    }
  }

  handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      this.state.page < this.state.totalPages &&
      scrollHeight - clientHeight - scrollTop < 200
    ) {
      this.nextPage();
    }
  };

  throttledScrollHandler = throttle(this.handleScroll.bind(this), 300);

  nextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImageClick = imageId => {
    const imgInfo = this.state.images.find(({ id }) => id === imageId);
    this.setState({
      isModalShown: true,
      modalImgUrl: imgInfo.largeImageURL,
      captionData: imgInfo.tags,
    });
  };

  modalClose = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    return (
      <>
        {this.state.loading && (
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
          {this.state.images.map(image => (
            <ImageGalleryItem
              key={image.id}
              id={image.id}
              img={image.webformatURL}
              onImageClick={this.onImageClick}
              alt={image.tags}
            />
          ))}
        </ul>
        {this.state.images.length > 0 &&
          this.state.page !== this.state.totalPages && (
            <Button onClick={this.nextPage}>Load More</Button>
          )}
        {this.state.isModalShown && (
          <Modal onClose={this.modalClose}>
            <img
              src={this.state.modalImgUrl}
              alt={this.state.captionData}
              onLoad={({ currentTarget }) => {
                currentTarget.parentNode.classList.add('captionShow');
              }}
            />
            <p className="CaptionData">{this.state.captionData}</p>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
