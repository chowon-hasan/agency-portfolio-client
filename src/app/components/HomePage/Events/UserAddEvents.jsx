"use client";
import React, { useEffect, useState } from "react";
import "./events.css";
import localFont from "next/font/local";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";

import { BeatLoader } from "react-spinners";
import Button from "../../Button/Button";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import "@/app/responsive.css";
const ethFont = localFont({
  src: "../../../../app/my-fonts/ethnocentric-rg.otf",
});
const UserAddEvents = () => {
  const { user } = useAuth();
  const {
    data: Eventsdate,
    isLoading,
    refetch,
  } = useDynamicGet("getuserevents", user?.email);
  console.log(Eventsdate);

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  return (
    <>
      {Eventsdate?.length > 0 ? (
        <section className="my-12">
          <h2 className="my-5 text-center">Your uploaded Dates and loaction</h2>
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
            <div className="grid grid-cols-3 gap-5 gridSections2">
              {Eventsdate?.map(({ _id, date, services, location }) => (
                <>
                  <div key={_id} className="">
                    <div className="date_box">
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
                        <div className="flex items-center">
                          <FaCamera className="me-5" />{" "}
                          {services.map((c) => (
                            <>
                              <div className="">
                                <p className="me-5">{c}</p>
                              </div>
                            </>
                          ))}
                        </div>
                        <h2 className="flex items-center">
                          <FaMapMarkerAlt className="me-5" /> {location}
                        </h2>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Button />
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default UserAddEvents;
