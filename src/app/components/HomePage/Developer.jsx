import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import me from "public/images/me.png";
import "../../../app/responsive.css";
const ethFont = localFont({
  src: "../../my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../my-fonts/Moonrising.otf",
});

const Developer = () => {
  return (
    <section className="bg-black py-12 mb-2">
      <div className="container mx-auto">
        <h2
          className={`${moonFont.className} text-center text-4xl text-white subHead`}
        >
          Designed and developed by
        </h2>
        <h1
          className={`${ethFont.className} text-7xl  mb-5 text-center text-white heading`}
        >
          chowon hasan
        </h1>
        <div className="">
          <div>
            <Image
              src={me}
              className="mx-auto"
              width={200}
              height={300}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
