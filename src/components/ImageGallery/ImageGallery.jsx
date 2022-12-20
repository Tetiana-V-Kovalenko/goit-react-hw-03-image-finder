import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ imagesArr, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {imagesArr.map(({ webformatURL, tags, id, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onImageClick={onImageClick}
          id={largeImageURL}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  imagesArr: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func,
};
export default ImageGallery;
