import React from "react";
import localFont from "next/font/local";
import EventClient from "./EventClient";
import UserAddEvents from "./UserAddEvents";
import "../../../../app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});
const Events = () => {
  return (
    <section className="my-24" id="events">
      <div className="container mx-auto">
        <h1
          className={`${ethFont.className} text-7xl text-black mt-5 text-center heading`}
        >
          our next move
        </h1>
        <p
          className={`${moonFont.className} text-center mt-2 text-black subHead`}
        >
          see out next events date and place
        </p>
        <div
          className="memeberContainer"
          style={{
            width: "1000px",
            margin: "40px auto",
          }}
        >
          <UserAddEvents />
          <EventClient />
        </div>
      </div>
    </section>
  );
};

export default Events;
