"use client";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { FaCamera } from "react-icons/fa";

const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});

const ButtonWhite = () => {
  return (
    <Link href="#">
      <button
        className={`${ethFont.className} bg-white buttonPrent border text-black mt-5 py-3 px-2 text-xs flex justify-center items-center`}
      >
        Call Us Today <FaCamera className="ms-3" />
      </button>
    </Link>
  );
};

export default ButtonWhite;
