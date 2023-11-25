"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/slick-carousel/slick/slick-theme.css";
import "./recentworks.css";
import useGetMethod from "@/app/utills/useGetMethod";
import { BeatLoader } from "react-spinners";
import useDynamicGet from "@/app/utills/useDynamicGet";
import useAuth from "@/Hooks/useAuth";
import PhotoFrameBig from "../../PhotoFrameBig";
import "../../../../app/responsive.css";

const RecentClient = () => {
  const { user } = useAuth();
  const { data: recentWorksStatic } = useGetMethod("recentworks");
  console.log(recentWorksStatic, "hello");

  const {
    data: RecentWorks,
    isLoading,
    refetch,
  } = useDynamicGet("getrecentworkimages", user?.email);
  console.log(RecentWorks);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedclientImage, setSelectedclientImage] = useState(null);

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.getElementById("my_modal_4").showModal();
  };
  const handleImageClick2 = (image) => {
    setSelectedclientImage(image);
    document.getElementById("my_modal_5").showModal();
  };
  return (
    <section className="my-12 z-0">
      <div className="container mx-auto">
        <div>
          {RecentWorks?.map(({ images, _id }) => (
            <div
              className="grid grid-cols-3 gap-5 items-center overflow-hidden gridSections"
              key={_id}
            >
              {images
                .slice()
                .reverse()
                .map((img, index) => (
                  <div key={index} onClick={() => handleImageClick2(img)}>
                    <PhotoFrameBig imageUrl={img} altText={img} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 my-12 items-center overflow-hidden gridSections">
          {recentWorksStatic?.map(({ image, _id }) => (
            <div key={_id} className="" onClick={() => handleImageClick(image)}>
              <PhotoFrameBig imageUrl={image} altText={image} />
              {/* <Image
                src={image}
                style={{ width: "400px", height: "250px", overflow: "hidden" }}
                width={1000} // Adjust the width as needed
                height={1000} // Adjust the height as needed
                alt="Image from recentWorksStatic"
              /> */}
            </div>
          ))}
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box bg-white">
          {selectedImage && (
            <Image
              className="myday"
              src={selectedImage}
              style={{ width: "100%", height: "100%" }}
              width={1000}
              height={1000}
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
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box bg-white">
          {selectedclientImage && (
            <Image
              className="myday"
              src={selectedclientImage}
              style={{ width: "100%", height: "100%" }}
              width={1000}
              height={1000}
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
    </section>
  );
};

export default RecentClient;
