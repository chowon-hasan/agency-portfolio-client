"use client";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { FaCamera } from "react-icons/fa";
import "@/app/responsive.css";
const ethFont = localFont({
  src: "../../../app/my-fonts/ethnocentric-rg.otf",
});

const Button = () => {
  return (
    <Link href="#">
      <div className="">
        <button
          className={`${ethFont.className} bg-transparent border text-black mt-5 py-3 px-2 text-xs flex justify-center items-center buttonPrent`}
        >
          Call Us Today <FaCamera className="ms-3" />
        </button>
      </div>
    </Link>
  );
};

export default Button;
