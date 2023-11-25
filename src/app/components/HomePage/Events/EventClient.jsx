"use client";
import React, { useEffect, useState } from "react";
import "./events.css";
import localFont from "next/font/local";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import useGetMethod from "@/app/utills/useGetMethod";
import { BeatLoader } from "react-spinners";
import Button from "../../Button/Button";
import "../../../../app/responsive.css";

const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const EventClient = () => {
  const { data: Events, isLoading, refetch } = useGetMethod("events");

  return (
    <section>
      {isLoading ? (
        <div
          className="
                      h-[10px]
                      flex 
                      flex-col 
                      justify-center 
                      items-center"
        >
          <BeatLoader size={10} color="#fff" />
        </div>
      ) : (
        <div className="container">
          <div className="grid grid-cols-3 gap-5 gridSections2">
            {Events?.map(({ id, date, event_name, location }) => (
              <>
                <div key={id} className="date_box">
                  <div className="">
                    <h2
                      className={`${ethFont.className} text-sm mb-5 text-black`}
                    >
                      {date &&
                        new Date(date).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                    </h2>
                    <div className="text-center">
                      <h2 className="flex items-center">
                        <FaCamera className="me-5" /> {event_name}
                      </h2>
                      <h2 className="flex items-center">
                        <FaMapMarkerAlt className="me-5" /> {location}
                      </h2>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button />
      </div>
    </section>
  );
};

export default EventClient;
