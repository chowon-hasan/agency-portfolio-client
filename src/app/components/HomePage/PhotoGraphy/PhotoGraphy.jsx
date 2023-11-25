import React from "react";
import "./photo.css";
import localFont from "next/font/local";
import "../../../../app/responsive.css";
import PhotoCard from "./PhotoCard";
import StaticPhoto from "./StaticPhoto";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});

const PhotoGraphy = async () => {
  return (
    <section className="min-h-screen my-12" id="services">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-black text-center heading`}
          >
            our service&apos;s
          </h1>
          <p
            className={`${moonFont.className} text-center mt-2 text-black subHead`}
          >
            we are more than just visual storytellers
          </p>
          <h1
            className={`${ethFont.className} text-2xl text-black my-16 text-center`}
          >
            photography
          </h1>
        </div>
        <div className="mt-5">
          <PhotoCard />
          <StaticPhoto />
        </div>
      </div>
    </section>
  );
};

export default PhotoGraphy;
