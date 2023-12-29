import React from "react";
import localFont from "next/font/local";
import "@/app/responsive.css";
import ClientsComponent from "./ClientsComponent";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const ClinetsReview = () => {
  return (
    <section className="py-12 bg-black" id="review">
      <div className="container mx-auto">
        <div className="">
          <h1
            className={`${ethFont.className} text-7xl text-white mt-5 text-center heading`}
          >
            Happy clients
          </h1>
          <p
            className={`${moonFont.className} text-center mt-2 text-white subHead`}
          >
            we are more than just visual storytellers
          </p>
        </div>
        <div className="my-24">
          <ClientsComponent />
        </div>
      </div>
    </section>
  );
};

export default ClinetsReview;
