import React from "react";
import "./hero.css";
import localFont from "next/font/local";
import Button from "../../Button/Button";
import Image from "next/image";
import heroimg from "../../../../../public/images/hero.png";
import "../../../../app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const HeroSection = () => {
  return (
    <section className="pt-28" id="home">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
          >
            Agency Portfolio
          </h1>
        </div>
        <div className="flex justify-center items-center flexSection">
          <div className="w-full  parentsection">
            <h2 className={`${moonFont.className} text-4xl text-black subHead`}>
              Capturing Moments, Creating Memories
            </h2>
            <p className="mt-5">
              Welcome to [Agency Name], where the art of visual storytelling
              comes to life. Our passion is capturing the essence of life. most
              beautiful moments, transforming them into timeless memories.
              Through the lens of our talented photographers and
              cinematographers, we turn everyday scenes into extraordinary
              narratives.
            </p>
            <div className="buttonPrent">
              <Button />
            </div>
          </div>
          <div className="w-full flex justify-center mt-12">
            <div className="">
              <Image
                src={heroimg}
                className="imageBanner"
                width={500}
                height={500}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
