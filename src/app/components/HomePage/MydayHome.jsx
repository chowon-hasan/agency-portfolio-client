"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "./homepage.css";
import localFont from "next/font/local";
import "../../../app/responsive.css";

const moonFont = localFont({
  src: "../../../app/my-fonts/Moonrising.otf",
});

const MydayHome = () => {
  const { user } = useAuth();

  const {
    data: featuredImages,
    isLoading,
    refetch,
  } = useDynamicGet("featuredimage", user?.email);

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const settings = {
    className: "center",
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  };

  return (
    <>
      {featuredImages?.length > 0 ? (
        <section className="border py-12" id="live">
          <div className="container mx-auto">
            <h2
              className={`${moonFont.className} text-4xl text-black mb-5 text-center titlePopins`}
            >
              Just uploaded our activities
            </h2>
            <p className="mb-5 text-center">Touch on images for clean view.</p>
            <div className="">
              <Slider {...settings}>
                {featuredImages?.map(({ _id, image, time }) => (
                  <div key={_id} className="image-wrapper">
                    <div className="before-after">
                      <div className="image-overlay">
                        <Image
                          className="rounded-full border-2 border-lime-500"
                          src={user?.photoURL}
                          width={60}
                          height={60}
                          alt=""
                        />
                        <p className="my-5">See Admins Day</p>
                        <p className="text-sm text-center my">
                          {time &&
                            new Date(time).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              month: "short",
                              day: "numeric",

                              timeZone: "Asia/Dhaka", // Set to Bangladesh time
                            })}
                        </p>
                      </div>
                      <Image
                        className="myday"
                        src={image}
                        style={{ width: "450px", height: "300px" }}
                        width={450}
                        height={300}
                        alt="member image"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default MydayHome;
