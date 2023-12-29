import React from "react";
import localFont from "next/font/local";
import Image from "next/image";
import Drone from "../../../../../public/images/drone.png";
import "@/app/responsive.css";
import {
  FaPushed,
  FaSketch,
  FaSkyatlas,
  FaThinkPeaks,
  FaUnity,
  FaVaadin,
} from "react-icons/fa";
import "./whyus.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const WhyUs = () => {
  return (
    <section className="my-24">
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
        >
          Why choose us
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          We are not only a team. we are dreamer&apos;s
        </p>
        <div>
          <div className="w-full">
            <Image
              style={{ margin: "auto" }}
              src={Drone}
              width={500}
              height={300}
              alt="drone"
            />
          </div>

          {/* card design */}
          <div className="flex justify-center gap-5 gridSections">
            {/* card number one */}
            <div
              style={{ height: "400px", width: "400px" }}
              className="carddesign text-center p-5 flex flex-col justify-center items-center"
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",
                  background: "#000",
                  margin: "auto",
                }}
              >
                <FaThinkPeaks className="text-5xl text-white" />
              </div>
              <div className="">
                <h2 className={`${ethFont.className} text-lg text-white mt-2`}>
                  Quality
                </h2>
                <p className="my-5">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Beatae, nemo. Repellendus laboriosam itaque placeat ratione
                  consequatur vel reprehenderit odit esse?
                </p>
                <div className="flex justify-center items-center mt-5">
                  <h3 style={{ textDecoration: "underline" }}>Research</h3>
                  <h3 style={{ textDecoration: "underline" }} className="mx-5">
                    Testing
                  </h3>
                  <h3 style={{ textDecoration: "underline" }}>Analyzing</h3>
                </div>
                <div className="text-center">
                  <FaSketch className="text-4xl m-auto my-5 text-white" />
                </div>
              </div>
            </div>

            {/* card number two */}
            <div
              style={{ height: "400px", width: "400px" }}
              className="carddesign text-center p-5 flex flex-col justify-center items-center"
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",
                  background: "#000",
                  margin: "auto",
                }}
              >
                <FaPushed className="text-5xl text-white" />
              </div>
              <div className="">
                <h2 className={`${ethFont.className} text-lg text-white mt-2`}>
                  passion
                </h2>
                <p className="my-5">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Beatae, nemo. Repellendus laboriosam itaque placeat ratione
                  consequatur vel reprehenderit odit esse?
                </p>
                <div className="flex justify-center items-center mt-5">
                  <h3 style={{ textDecoration: "underline" }}>Research</h3>
                  <h3 style={{ textDecoration: "underline" }} className="mx-5">
                    Testing
                  </h3>
                  <h3 style={{ textDecoration: "underline" }}>Analyzing</h3>
                </div>
                <div className="text-center">
                  <FaSkyatlas className="text-4xl m-auto my-5 text-white" />
                </div>
              </div>
            </div>

            {/* card number three */}
            <div
              style={{ height: "400px", width: "400px" }}
              className="carddesign text-center p-5 flex flex-col justify-center items-center"
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "100%",
                  background: "#000",
                  margin: "auto",
                }}
              >
                <FaUnity className="text-5xl text-white" />
              </div>
              <div className="">
                <h2 className={`${ethFont.className} text-lg text-white mt-2`}>
                  unity
                </h2>
                <p className="my-5">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Beatae, nemo. Repellendus laboriosam itaque placeat ratione
                  consequatur vel reprehenderit odit esse?
                </p>
                <div className="flex justify-center items-center mt-5">
                  <h3 style={{ textDecoration: "underline" }}>Research</h3>
                  <h3 style={{ textDecoration: "underline" }} className="mx-5">
                    Testing
                  </h3>
                  <h3 style={{ textDecoration: "underline" }}>Analyzing</h3>
                </div>
                <div className="text-center">
                  <FaVaadin className="text-4xl m-auto my-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
