import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const imgContainer = {
  width: "100%",
  objectFit: "contain",
};

const ImageSlider = ({images, sliderContainer, imgDim, autoplay, duration}) => {
  return (
    <div style={sliderContainer}>
      <Slide autoplay={autoplay} duration={duration} >
        {images.map((slideImage, index) => (
          <div key={index} style={imgContainer}>
            <img src={slideImage.url} style={imgDim} />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
