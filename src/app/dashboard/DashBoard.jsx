import Image from "next/image";
import React from "react";
import welcomeImage from "../../../public/images/dashbaord.png";
import localFont from "next/font/local";
import "../../app/responsive.css";
const ethFont = localFont({
  src: "../../../src/app/my-fonts/ethnocentric-rg.otf",
});

const DashBoard = () => {
  return (
    <section
      style={{
        height: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className=" backdrop-blur-sm bg-gray/30 p-5 rounded-md dashHome"
    >
      <div className="">
        <h1
          className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
        >
          welcome
        </h1>
      </div>
      <div className="my-5 text-white">
        <div className="">
          <h1 className="text-3xl text-center subHead">
            Welcome to Your Agency Portfolio Dashboard
          </h1>
          <p className="text-center">
            Hello Your Business Name, We are thrilled to have you here at your
            Agency Portfolio Dashboard! This is your central hub for managing
            and showcasing your creative work in photography and cinematography.
            What You Can Do: Manage Content: Easily update and customize your
            portfolio content. Showcase your latest projects, highlight your
            team, and share your story. Upload Media: Showcase your best work
            with high-quality images and videos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
