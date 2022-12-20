const ImageGalleryItem = ({ webformatURL, tags, onImageClick, id }) => {
  return (
    <li className="ImageGalleryItem" onClick={onImageClick} id={id}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
