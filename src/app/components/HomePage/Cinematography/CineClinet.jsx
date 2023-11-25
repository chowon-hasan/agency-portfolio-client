"use client";

import React, { useEffect } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import useDynamicGet from "@/app/utills/useDynamicGet";
import "../../../../app/responsive.css";
import useAuth from "@/Hooks/useAuth";
import { BeatLoader } from "react-spinners";

const moonFont = localFont({
  src: "../../../../app/my-fonts/Moonrising.otf",
});

const CineClinet = () => {
  const { user } = useAuth();
  const {
    data: cineVideos,
    isLoading,
    refetch,
  } = useDynamicGet("getcinevideos", user?.email);
  console.log(cineVideos);

  //   const [logo = {}] = Logos || [];
  //   const { image } = logo;

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  return (
    <>
      {cineVideos?.length > 0 ? (
        <section>
          <div className="container mx-auto">
            <div className="">
              <div className="">
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
                  <>
                    <div className="lg:grid grid-cols-3 gap-12">
                      {cineVideos?.map((video) => (
                        <div key={video?._id} className="">
                          <div className="">
                            <iframe
                              className="videoscine"
                              width={500}
                              height={400}
                              src={
                                video?.link ||
                                `https://www.youtube.com/embed/1_Hfi1EV0-k?si=FMpeQY0xEgNWEXgr`
                              }
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default CineClinet;
