import React from "react";
import PropTypes from "prop-types";

function ImageCard({ cls, src, alt }) {
  return (
    <img
      onContextMenu={(e) => e.preventDefault()}
      className={cls}
      src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${src}`}
      alt={alt}
    />
  );
}

ImageCard.propTypes = {
  cls: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

ImageCard.defaultProps = {
  cls: "",
  src: "",
  alt: "",
};
export default ImageCard;
