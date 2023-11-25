// components/PhotoFrame.js
import React from "react";
import Image from "next/image";
import "./photoframe.css";
import "../../app/responsive.css";

const PhotoFrameVertical = ({ imageUrl, altText }) => {
  return (
    <div className="frame_box_Vertical">
      <Image src={imageUrl} width={250} height={400} alt={altText} />
    </div>
  );
};

export default PhotoFrameVertical;
