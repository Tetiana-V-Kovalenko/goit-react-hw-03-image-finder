import PropTypes from 'prop-types';
const ImageGalleryItem = ({ webformatURL, tags, onImageClick, id }) => {
  return (
    <li className="ImageGalleryItem" onClick={onImageClick} id={id}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onImageClick: PropTypes.func,
  id: PropTypes.string,
};
export default ImageGalleryItem;
