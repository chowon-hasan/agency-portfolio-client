import React from "react";
import "./about.css";
import Image from "next/image";
import AboutImg from "/public/images/aboutUsman.jpg";
import localFont from "next/font/local";
import ButtonWhite from "../../Button/ButtonWhite";
import "@/app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const AboutUs = () => {
  return (
    <section className="min-h-screen py-12 bg-black" id="about">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
          >
            About Us
          </h1>
          <p
            className={`${moonFont.className} text-center mt-2 text-white subHead`}
          >
            we are more than just visual storytellers
          </p>
        </div>
        <div className="my-24">
          <div className="w-full flex justify-center">
            <Image
              style={{ width: "500px", height: "500px" }}
              className="aboutIMG"
              src={AboutImg}
              alt="Hero"
            />
          </div>
          <div className="w-full parentsection">
            <h2 className={`${moonFont.className} text-4xl text-white`}>
              Story of our Agency
            </h2>
            <p className="mt-5 text-white">
              we are passionate creators who bring your unique moments to life
              through the lens. With a shared love for photography and
              cinematography, our team is dedicated to preserving the beauty of
              every instant and weaving it into a captivating narrative. Founded
              on the belief that every moment, no matter how ordinary, holds the
              potential for extraordinary storytelling, weve committed ourselves
              to capturing the raw emotion, the subtle details, and the vivid
              colors that define your special occasions. Whether it&apos;s a
              grand wedding, a tranquil landscape, a lively event, or an
              intimate portrait, we pride ourselves on our ability to blend
              technical excellence with creative flair. Our mission is simple:
              to create visual experiences that transcend the limitations of
              time. We invite you to explore our portfolio, learn more about our
              talented team, and embark on a visual journey with us. Together,
              we&apos;ll turn life&apos;s fleeting moments into enduring works
              of art.
            </p>
            <ButtonWhite />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
