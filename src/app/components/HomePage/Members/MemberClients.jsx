"use client";

import useGetMethod from "@/app/utills/useGetMethod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import UserAddmembers from "./UserAddmembers";
import PhotoFrameVertical from "../../PhotoFrameVertical";
import "@/app/responsive.css";

const MemberClients = () => {
  const { data: Ourmembers, isLoading, refetch } = useGetMethod("ourmembers");
  console.log(Ourmembers, "hello");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <section className="my-16">
      <div className="">
        <UserAddmembers />
      </div>
      <h1 className="my-12 text-center bg-black text-white p-5 capitalize">
        default Members carousel.
      </h1>
      <div className="memberCaro">
        <Slider {...settings}>
          {Ourmembers?.map(
            ({ id, image, name, designation, about, clicks }) => (
              <>
                <div key={id} className="lg:flex">
                  <div className="mx-2">
                    <PhotoFrameVertical imageUrl={image} altText={image} />
                    {/* <Image
                      src={image}
                      style={{ width: "100%", height: "100%" }}
                      width={700}
                      height={148}
                      alt="member image"
                    /> */}
                  </div>
                  <div className="ms-5 flex flex-col justify-between">
                    <div className="">
                      <h2 className="text-xl capitalize">{name}</h2>
                      <h5>{designation}</h5>
                    </div>
                    <p>{about}</p>
                    <p className="text-xs">some of his best click</p>
                    <div className="flex gap-5">
                      {clicks?.map((c) => (
                        <Image
                          key={id}
                          src={c}
                          width={200}
                          height={148}
                          alt="clicks"
                          className="best_click"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </Slider>
      </div>
    </section>
  );
};

export default MemberClients;
