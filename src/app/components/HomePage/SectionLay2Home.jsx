import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { FaCamera } from "react-icons/fa";
import "../../../app/responsive.css";
const ethFont = localFont({
  src: "../../../../src/app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../src/app/my-fonts/Moonrising.otf",
});

const SectionLay2Home = ({
  image,
  heading,
  subheading,
  buttonLink,
  description,
  title,
}) => {
  return (
    <section
      style={{
        background: "#fff",
        color: "#000",
        padding: "40px 0",
      }}
    >
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl  mb-5 text-center heading`}
        >
          {heading?.split(/\s+/).slice(0, 3).join(" ")}
        </h1>
        <h2
          className={`${moonFont.className} text-center text-4xl text-black subHead`}
        >
          {title?.split(/\s+/).slice(0, 8).join(" ")}
        </h2>
        <div className="flex  items-center gap-5 my-24 gridSections7">
          <div className="lg:w-[50%]">
            <div className="">
              <p className={`${moonFont.className} text-3xl`}>{subheading}</p>
              <p className="py-5">
                {description?.split(/\s+/).slice(0, 200).join(" ")}
              </p>
            </div>
            <Link href={buttonLink ? buttonLink : ""}>
              <button className="btn bg-white border text-black">
                Call Us Today <FaCamera className="ms-3" />
              </button>
            </Link>
          </div>
          <div className="lg:w-[50%]">
            <Image src={image && image} width={1000} height={1000} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLay2Home;
