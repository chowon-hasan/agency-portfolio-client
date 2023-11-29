"use client";
import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import { BarLoader, ClimbingBoxLoader } from "react-spinners";
import "../../app/responsive.css";
const ethFont = localFont({
  src: "../my-fonts/ethnocentric-rg.otf",
});
const Preloader = () => {
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(3);

  useEffect(() => {
    // Simulate a delay of 3 seconds before hiding the preloader
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);

      if (count === 1) {
        setLoading(false);
        clearInterval(timer);
      }
    }, 2000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div
      className={`min-h-screen fixed w-full z-50 flex justify-center items-center bg-black cursor-none ${
        isLoading ? "block" : "hidden"
      }`}
    >
      <div className="">
        <div className="mb-12 mx-auto">
          <BarLoader className="mx-auto" color="#fff" />
        </div>
        <div className="text-center">
          <p className="text-white">welcome to</p>
          <h1
            className={`${ethFont.className} text-7xl  mb-5 text-center text-white heading`}
          >
            agency portfolio
          </h1>

          <span
            className="countdown font-mono text-6xl"
            style={{ color: "#fff" }}
          >
            <span style={{ "--value": count }}></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
