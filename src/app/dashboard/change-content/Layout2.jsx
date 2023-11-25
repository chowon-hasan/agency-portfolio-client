import Image from "next/image";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";

const ethFont = localFont({
  src: "../../../../src/app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../src/app/my-fonts/Moonrising.otf",
});

const Layout2 = ({ image, heading, subheading, buttonLink, description }) => {
  return (
    <section
      style={{
        background: "#fff",
        color: "#000",
        margin: "30px 0",
      }}
    >
      <div className="p-12 mx-auto">
        <h1
          className={`${ethFont.className} text-4xl text-black mb-5 text-center`}
        >
          {heading}
        </h1>
        <div className="flex  items-center gap-5">
          <div className="w-[50%]">
            <p className={`${moonFont.className} mt-2 text-black text-md`}>
              {subheading}
            </p>
            <p className="text-xs py-5">{description}</p>
            <Link href={buttonLink}>
              <button className="btn bg-white border text-black">
                Call Us Today
              </button>
            </Link>
          </div>
          <div className="w-[50%]">
            <Image src={image} width={1000} height={1000} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout2;
