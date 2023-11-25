import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import me from "public/images/me.png";
import "../../../app/responsive.css";
import { FaFacebook, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
const ethFont = localFont({
  src: "../../my-fonts/ethnocentric-rg.otf",
});

const Developer = () => {
  return (
    <section className="bg-black py-12 mb-2">
      <div className="container mx-auto">
        <h2 className="text-center text-3xl text-white subHead">
          Designed and developed by
        </h2>

        <div className="lg:w-1/3 mx-auto border flex items-center gap-3 my-5 text-white">
          <div>
            <Image src={me} className="" width={200} height={300} alt="" />
          </div>
          <div className="">
            <h1
              className={`${ethFont.className} text-sm  text-center text-white`}
            >
              chowon hasan
            </h1>
            <p>Full-Stack Developer</p>
            <p className="flex items-center gap-5">
              <FaGlobe />{" "}
              <Link
                target="_blank"
                className="text-amber-100"
                href="https://portfolio-of-mehedi-hasan-chowon.netlify.app/"
              >
                Visit My Portfolio
              </Link>
            </p>
            <div className="flex items-center gap-5 mt-3">
              <Link
                target="_blank"
                href="https://www.facebook.com/megamind.megamind12fx/photos_by"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link target="_blank" href="https://wa.me/+8801782822008">
                <FaWhatsapp className="text-2xl" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/mehedi-hasan-chowon7/"
              >
                <FaLinkedin className="text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
