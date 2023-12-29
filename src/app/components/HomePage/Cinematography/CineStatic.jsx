"use client";

import React, { useEffect, useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import "@/app/responsive.css";

const moonFont = localFont({
  src: "../../../../../src/app/my-fonts/Moonrising.otf",
});

const CineStatic = () => {
  const [cineStaticvideo, setCineStatic] = useState([]);

  useEffect(() => {
    fetch("staticvideo.json")
      .then((res) => res.json())
      .then((data) => setCineStatic(data));
  }, []);
  return (
    <section className="my-12">
      <div className="container mx-auto">
        <div className="">
          <div className="">
            <div className="lg:grid grid-cols-3 gap-12">
              {cineStaticvideo?.map((video, i) => (
                <div key={i} className="">
                  <div className="">
                    <iframe
                      className="videoscine"
                      width={500}
                      height={400}
                      src={
                        video?.video ||
                        `https://www.youtube.com/embed/1_Hfi1EV0-k?si=FMpeQY0xEgNWEXgr`
                      }
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="">
            <h2 className={`${moonFont.className} text-2xl`}>
              our very last project for clients
            </h2>
            <p className="my-5">
              Welcome to [Agency Name], where the art of visual storytelling
              comes to life. Our passion is capturing the essence of life&apos;s
              most beautiful moments, transforming them into timeless memories.
              Through the lens of our talented photographers and
              cinematographers, we turn everyday scenes into extraordinary
              narratives.
            </p>
            <h2 className={`${moonFont.className} text-xl`}>
              for more visit our youtube channel
            </h2>
            <Link href="#">
              <button className="btn border border-1 border-black bg-transparent px-16 py-2 my-5">
                <FaYoutube className="text-red-900 text-2xl" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CineStatic;
