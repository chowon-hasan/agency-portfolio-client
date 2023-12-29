import React from "react";
import localFont from "next/font/local";
import PortfolioClient from "./PortfolioClient";
import UserPortfolioAdded from "./UserPortfolioAdded";
import "@/app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const PortfolioHome = () => {
  return (
    <section className="my-24" id="portfolio">
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
        >
          Portfolio
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          See our latest recent works here
        </p>
        <div>
          <UserPortfolioAdded />
          <PortfolioClient />
        </div>
      </div>
    </section>
  );
};

export default PortfolioHome;
