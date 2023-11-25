// components/PhotoFrame.js
import React from "react";
import Image from "next/image";
import "./photoframe.css";

const PhotoFrame = ({ imageUrl, altText }) => {
  return (
    <div className="frame_box">
      <Image src={imageUrl} width={500} height={500} alt={altText} />
    </div>
  );
};

export default PhotoFrame;
