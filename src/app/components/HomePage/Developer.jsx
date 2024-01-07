import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import me from "public/images/me.png";
import entrexx from "public/images/entrexx.png";
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
        <div className="">
          <div className="lg:w-1/2 mx-auto">
            <h2 className="text-white text-center mb-5">
              Featured product of Entrexx digital
            </h2>
            <Image
              src={entrexx}
              className="mx-auto"
              width={500}
              height={300}
              alt=""
            />
            <div className="flex items-center gap-5 mt-5 text-white justify-center ">
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

              <Link
                target="_blank"
                className="text-white text-xl"
                href="https://portfolio-of-mehedi-hasan-chowon.netlify.app/"
              >
                <FaGlobe />
              </Link>
            </div>
            <div className="text-center my-5 text-white">
              <h2 className="mb-5">Designed and developed by </h2>
              <div className="flex justify-center items-center gap-5">
                <Image src={me} className="" width={100} height={100} alt="" />
                <div className="">
                  <h1 className={`${ethFont.className} text-sm text-white`}>
                    chowon hasan
                  </h1>
                  <p>Full Stack Web Developer</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
