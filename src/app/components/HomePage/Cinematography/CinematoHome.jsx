import React from "react";
import localFont from "next/font/local";
import CineClinet from "./CineClinet";
import CineStatic from "./CineStatic";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});

const CinematoHome = () => {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-2xl text-black my-16 text-center`}
          >
            cinematography
          </h1>
        </div>
      </div>
      <div className="my-16">
        <CineClinet />
        <CineStatic />
      </div>
    </section>
  );
};

export default CinematoHome;
