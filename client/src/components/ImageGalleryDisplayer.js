import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import styles from './ImageGalleryDisplayer.module.css';


const ImageGalleryDisplayer = ({images, className}) => {
  
  return(
    <div className={`${styles.galleryWrapper} ${className}`}>
      <ImageGallery items={images} showPlayButton={false} showIndex={true} />
    </div>
  )
};

export default ImageGalleryDisplayer;
