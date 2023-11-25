"use client";
import useAuth from "@/Hooks/useAuth";
import useDynamicGet from "@/app/utills/useDynamicGet";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./homepage.css";
import localFont from "next/font/local";
import "../../../app/responsive.css";

const moonFont = localFont({
  src: "../../../app/my-fonts/Moonrising.otf",
});

const MydayHome = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: featuredImages,
    isLoading,
    refetch,
  } = useDynamicGet("featuredimage", user?.email);
  const allImages = featuredImages?.flatMap((item) => item.image);

  console.log(allImages);
  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const settings = {
    // className: "center",
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <>
      {featuredImages?.length > 0 && (
        <section className="border py-12" id="live">
          <div className="container mx-auto">
            <h2
              className={`${moonFont.className} text-4xl text-black mb-5 text-center titlePopins`}
            >
              Just uploaded our activities
            </h2>
            <p className="mb-5 text-center">
              Touch on images for a clean view.
            </p>
            <Slider {...settings}>
              {allImages.map((img, i) => (
                <SliderItem
                  key={i}
                  img={img}
                  user={user}
                  time={featuredImages[0]?.time} // assuming time is the same for all images
                  onClick={() => handleImageClick(img)}
                />
              ))}
            </Slider>
          </div>
        </section>
      )}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          {selectedImage && (
            <Image
              className="myday"
              src={selectedImage}
              style={{ width: "100%", height: "100%" }}
              width={450}
              height={300}
              alt="selected image"
            />
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle absolute right-2 top-2 text-white">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

const SliderItem = ({ img, user, time, onClick }) => (
  <div className="image-wrapper" onClick={onClick}>
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
              timeZone: "Asia/Dhaka",
            })}
        </p>
      </div>
      <Image
        className="myday"
        src={img}
        style={{ width: "450px", height: "300px" }}
        width={450}
        height={300}
        alt={img}
      />
    </div>
  </div>
);

export default MydayHome;
