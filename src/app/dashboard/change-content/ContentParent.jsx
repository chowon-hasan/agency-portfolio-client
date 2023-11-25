import React from "react";

import localFont from "next/font/local";
import LogoChange from "./LogoChange";
import PhotographyChange from "./PhotographyChange";
import CinematoContent from "./CinematoContent";
import AddRecentworks from "./AddRecentworks";
import AddPortfolio from "./AddPortfolio";
import AddMember from "./AddMember";
import EventsDate from "./EventsDate";
import AddSection from "./AddSection";
import "../../../app/responsive.css";
const ethFont = localFont({
  src: "../../../../src/app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../src/app/my-fonts/Moonrising.otf",
});

const ContentParent = () => {
  return (
    <section
      style={{ height: "900px" }}
      className=" backdrop-blur-sm bg-gray/30 p-5 rounded-md dash_container"
    >
      <div className="">
        <h1
          className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
        >
          Your Contents
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-white titleFont`}
        >
          you can change your content from here for each sections
        </p>
      </div>
      <div
        style={{ height: "630px", overflowY: "scroll", overflowX: "hidden" }}
        className="my-5 contents_paraent"
      >
        <div className="text-white">
          <LogoChange />
          <PhotographyChange />
          <CinematoContent />
          <AddRecentworks />
          <AddPortfolio />
          <AddMember />
          <EventsDate />
          <AddSection />
        </div>
      </div>
    </section>
  );
};

export default ContentParent;
