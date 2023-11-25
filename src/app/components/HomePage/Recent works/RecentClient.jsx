"use client";
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user?.email, refetch]);

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
                  <div key={index}>
                    <PhotoFrameBig imageUrl={img} altText={img} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 my-12 items-center overflow-hidden gridSections">
          {recentWorksStatic?.map(({ image, _id }) => (
            <div key={_id} className="">
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
    </section>
  );
};

export default RecentClient;
