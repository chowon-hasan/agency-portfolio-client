// components/PhotoFrame.js
import React from "react";
import Image from "next/image";
import "./photoframe.css";
import "../../app/responsive.css";

const PhotoFrameBig = ({ imageUrl, altText }) => {
  return (
    <div className="frame_box_Big">
      <Image
        className="frameImg"
        src={imageUrl}
        width={500}
        height={500}
        alt={altText}
      />
    </div>
  );
};

export default PhotoFrameBig;
