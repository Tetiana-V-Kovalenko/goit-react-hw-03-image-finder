import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ imagesArr, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {imagesArr.map(({ webformatURL, tags, id }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onImageClick={onImageClick}
          id={id}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
