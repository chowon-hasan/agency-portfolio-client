import React from "react";
import RecentClient from "./RecentClient";
import localFont from "next/font/local";
import "@/app/responsive.css";
const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const RecentWorks = () => {
  return (
    <section id="recent">
      <div className="">
        <h1
          className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
        >
          Recent Work&apos;s
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          we are more than just visual storytellers
        </p>
        <div>
          <RecentClient />
        </div>
      </div>
    </section>
  );
};

export default RecentWorks;
