import React from "react";
import localFont from "next/font/local";
import MemberClients from "./MemberClients";
import "@/app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const Members = () => {
  return (
    <section className="my-24">
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
        >
          our member&apos;s
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          Let&apos;s Welcome them our family
        </p>
        <div
          className="memeberContainer"
          style={{
            width: "1000px",
            margin: "auto",
          }}
        >
          <MemberClients />
        </div>
      </div>
    </section>
  );
};

export default Members;
