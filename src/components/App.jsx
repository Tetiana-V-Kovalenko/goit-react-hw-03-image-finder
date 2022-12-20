import React from 'react';
import PropTypes from 'prop-types';
import { animateScroll as scroll } from 'react-scroll';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import ButtonLoad from './Button/ButtonLoad';
import {
  fetchImagesOnSubmit,
  fetchImagesOnBtnLoadClick,
} from 'PixabayApi/PixabayApi';
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
  };

  state = {
    page: this.props.page,
    showModal: this.props.showModal,
    loading: this.props.loading,
    query: this.props.query,
    images: this.props.images,
    total: this.props.total,
    modalImage: this.props.modalImage,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      try {
        const images = await fetchImagesOnBtnLoadClick(
          this.state.query,
          this.state.page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
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

  onInputChange = e => {
    this.setState({ query: e.target.value });
  };

  onSubmitForm = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const images = await fetchImagesOnSubmit(this.state.query);
      this.setState({ images: images.hits, total: images.total });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false, page: 1 });
    }
  };

  onBtnLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      loading: true,
    }));
    this.scrollMore();
  };

  onImageClick = e => {
    const targetImage = this.state.images.find(
      ({ id }) => id === Number(e.currentTarget.id)
    );
    this.setState({
      modalImage: {
        tags: targetImage.tags,
        largeImageURL: targetImage.largeImageURL,
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
        <SearchBar
          onSubmitForm={this.onSubmitForm}
          onInputChange={this.onInputChange}
        />
        {images.length !== 0 && (
          <ImageGallery imagesArr={images} onImageClick={this.onImageClick} />
        )}
        {loading && <Loader />}
        {images.length >= 0 &&
          total > 12 &&
          12 * page < total &&
          loading === false && <ButtonLoad onBtnLoad={this.onBtnLoad} />}

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
    tags: PropTypes.string,
  }),
  page: PropTypes.number,
};
