import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ButtonLoad from './Button/ButtonLoad';
import { fetchImagesOnBtnLoadClick } from 'PixabayApi/PixabayApi';
import Loader from './Loader/Loader';
import 'styles.css';

export class App extends React.Component {
  static defaultProps = {
    showModal: false,
    loading: false,
    query: '',
    images: [],
    total: 0,
    modalImage: {},
    page: 1,
    error: null,
  };

  state = {
    page: this.props.page,
    showModal: this.props.showModal,
    loading: this.props.loading,
    query: this.props.query,
    images: this.props.images,
    total: this.props.total,
    modalImage: this.props.modalImage,
    error: this.props.error,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      try {
        const images = await fetchImagesOnBtnLoadClick(
          this.state.query,
          this.state.page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          total: images.totalHits,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  scrollMore = () => {
    scroll.scrollMore(450);
  };

  handleFormSubmit = query => {
    this.setState({
      showModal: false,
      images: [],
      total: 0,
      modalImage: {},
      page: 1,
      loading: true,
      query: query,
    });
  };

  onBtnLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
    this.scrollMore();
  };

  onImageClick = e => {
    this.setState({
      modalImage: {
        largeImageURL: e.currentTarget.id,
      },
    });
    this.toggleShowModal();
  };

  toggleShowModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, images, modalImage, loading, total, page } = this.state;
    return (
      <div className="App">
        <SearchBar handleSubmit={this.handleFormSubmit} />
        {images.length !== 0 && (
          <ImageGallery imagesArr={images} onImageClick={this.onImageClick} />
        )}
        {loading && <Loader />}
        {!loading && total > 12 * page && (
          <ButtonLoad onBtnLoad={this.onBtnLoad} />
        )}

        {showModal && (
          <Modal
            tags={modalImage.tags}
            largeImageURL={modalImage.largeImageURL}
            onClose={this.toggleShowModal}
          />
        )}
      </div>
    );
  }
}
App.propTypes = {
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  query: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number,
  modalImage: PropTypes.exact({
    largeImageURL: PropTypes.string,
  }),
  page: PropTypes.number,
  error: PropTypes.instanceOf(Error),
};
